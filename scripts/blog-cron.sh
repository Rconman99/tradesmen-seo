#!/bin/bash
# Cron-only replacement for the claude.ai/code "tradesmen-seo blog generator"
# trigger. Picks the next pending keyword, runs --generate --publish (which
# uses local Ollama for content + Sanity for publishing), updates the queue,
# commits + pushes. Zero LLM tokens spent on the orchestration.
#
# Why this exists: the original Claude trigger explicitly says "Do NOT run
# --generate (requires local Ollama which is not available remotely)" — so
# Claude was writing 1,200–1,800-word SEO posts manually every run. Moving
# to launchd lets us use the existing --generate pipeline that's already
# in the repo. Big token win.
#
# Schedule: weekly via launchd (default Mon 9:00am Mac local time).
# Secrets:  ~/.config/tradesmen-seo/.env (SANITY_API_WRITE_TOKEN, OLLAMA_MODEL)
# Logs:     ~/.cache/tradesmen-seo-blog.log

set -u

REPO="$HOME/projects/tradesmen-seo"
ENV_FILE="$HOME/.config/tradesmen-seo/.env"
LOG="$HOME/.cache/tradesmen-seo-blog.log"
STARTED=$(date +%s)

mkdir -p "$(dirname "$LOG")"

log() { echo "[$(date '+%F %T')] $*" | tee -a "$LOG" >&2; }

log_telemetry() {
  local status="$1" keyword="${2:-}" slug="${3:-}"
  local runtime=$(( $(date +%s) - STARTED ))
  python3 -c "
import sys, pathlib
sys.path.insert(0, str(pathlib.Path.home() / 'projects/local-llm-toolkit/scripts'))
try:
    from llm_telemetry import log_run, estimate_savings
    # Claude would write a 1500-word post: ~2K input + 4K output. That's the bulk.
    log_run('nwcc-blog-cron', status='$status',
            tokens_saved=60000,
            est_usd_saved=estimate_savings(input_tokens=2000, output_tokens=4000, model='sonnet'),
            runtime_sec=$runtime,
            extra={'keyword': '$keyword', 'slug': '$slug'})
except Exception:
    pass
" 2>/dev/null || true
}

# Load secrets
if [ ! -f "$ENV_FILE" ]; then
  log "✗ Missing $ENV_FILE — copy .env.example and fill in SANITY_API_WRITE_TOKEN."
  log_telemetry "failed" "${NEXT_KW:-unknown}"
  exit 1
fi
# shellcheck disable=SC1090
set -a; . "$ENV_FILE"; set +a

if [ -z "${SANITY_API_WRITE_TOKEN:-}" ]; then
  log "✗ SANITY_API_WRITE_TOKEN empty in $ENV_FILE."
  log_telemetry "failed" "${NEXT_KW:-unknown}"
  exit 1
fi

cd "$REPO" || { log "✗ Repo not found at $REPO"; exit 1; }

# Repo's own .env.local has NEXT_PUBLIC_SANITY_PROJECT_ID — load it too
if [ -f "$REPO/.env.local" ]; then
  set -a; . "$REPO/.env.local"; set +a
fi

# Refuse to run on a feature branch
current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
if [ "$current_branch" != "main" ]; then
  log "✗ Not on main (currently $current_branch). Skipping run."
  log_telemetry "failed" "${NEXT_KW:-unknown}"
  exit 1
fi
git fetch origin main --quiet 2>>"$LOG" || log "⚠ git fetch failed"
git pull --rebase origin main --quiet 2>>"$LOG" || log "⚠ git pull failed"

# Find first pending keyword via Python (handles both list and {keywords: [...]} shapes)
NEXT_KW=$(python3 - <<'PY'
import json, sys, pathlib
p = pathlib.Path("data/keyword-queue.json")
if not p.exists():
    sys.exit("no-queue")
data = json.loads(p.read_text())
items = data if isinstance(data, list) else data.get("keywords", [])
for item in items:
    if item.get("status") == "pending":
        print(item.get("keyword", ""))
        sys.exit(0)
sys.exit("all-published")
PY
)
NEXT_EXIT=$?

if [ "$NEXT_EXIT" -ne 0 ]; then
  log "✓ No pending keywords — nothing to publish this week."
  exit 0
fi

if [ -z "$NEXT_KW" ]; then
  log "✗ Queue parsed but next keyword empty — check queue format."
  log_telemetry "failed" "${NEXT_KW:-unknown}"
  exit 1
fi

log "→ Generating post for keyword: '$NEXT_KW'"

# STEP 1: generate (no --publish yet — we want to validate before pushing).
npx tsx scripts/generate-post.ts --keyword "$NEXT_KW" --generate >>"$LOG" 2>&1
GEN_EXIT=$?

if [ "$GEN_EXIT" -ne 0 ]; then
  log "✗ generate-post failed (exit=$GEN_EXIT). Did NOT update queue. See $LOG."
  log_telemetry "failed" "${NEXT_KW:-unknown}"
  exit 1
fi
log "✓ Post generated"

# STEP 2: find the slug + JSON file generate-post just wrote
GENERATED_JSON=$(python3 - <<'PY'
import json, pathlib, time
data_dir = pathlib.Path("data")
files = [f for f in data_dir.glob("*.json")
         if f.name != "keyword-queue.json" and f.stat().st_mtime > time.time() - 600]
print(max(files, key=lambda f: f.stat().st_mtime) if files else "")
PY
)
if [ -z "$GENERATED_JSON" ]; then
  log "✗ Could not find newly-generated post in data/"; exit 1
fi
log "→ Validating $GENERATED_JSON"

# STEP 3: validate against SEO ruleset BEFORE publishing. Refuse bad posts.
python3 scripts/validate-blog-post.py "$GENERATED_JSON" "$NEXT_KW" >>"$LOG" 2>&1
VAL_EXIT=$?
if [ "$VAL_EXIT" -ne 0 ]; then
  log "✗ Post failed validation. NOT publishing. Move bad post out of queue manually if needed."
  log "   Generated file: $GENERATED_JSON"
  log_telemetry "failed" "${NEXT_KW:-unknown}"
  exit 1
fi

# STEP 4: publish to Sanity (now that validation passed)
log "→ Publishing $GENERATED_JSON to Sanity"
npx tsx scripts/generate-post.ts --input "$GENERATED_JSON" >>"$LOG" 2>&1
PUB_EXIT=$?
if [ "$PUB_EXIT" -ne 0 ]; then
  log "✗ Publish step failed (exit=$PUB_EXIT). Validation passed but Sanity rejected. See $LOG."
  log_telemetry "failed" "${NEXT_KW:-unknown}"
  exit 1
fi
log "✓ Published to Sanity"

# Find the slug that was just generated (most recent .json in data/ that isn't keyword-queue.json)
SLUG=$(python3 - <<PY
import json, pathlib, time
data_dir = pathlib.Path("data")
files = [f for f in data_dir.glob("*.json")
         if f.name != "keyword-queue.json" and f.stat().st_mtime > time.time() - 600]
if not files:
    print("")
else:
    latest = max(files, key=lambda f: f.stat().st_mtime)
    try:
        post = json.loads(latest.read_text())
        print(post.get("slug", latest.stem))
    except Exception:
        print(latest.stem)
PY
)
log "✓ Slug: ${SLUG:-(unknown)}"

# Update the queue: mark this keyword published
python3 - "$NEXT_KW" "$SLUG" <<'PY'
import json, sys, pathlib
from datetime import date
keyword, slug = sys.argv[1], sys.argv[2]
p = pathlib.Path("data/keyword-queue.json")
data = json.loads(p.read_text())
items = data if isinstance(data, list) else data.get("keywords", [])
for item in items:
    if item.get("keyword") == keyword and item.get("status") == "pending":
        item["status"] = "published"
        item["published_date"] = date.today().isoformat()
        if slug:
            item["slug"] = slug
        break
p.write_text(json.dumps(data, indent=2) + "\n")
print(f"queue updated for {keyword}")
PY

# Commit + push
git config user.name 'Blog Bot'
git config user.email 'blog-bot@conwellagentic.dev'
git add data/ 2>>"$LOG" || true
if git diff --cached --quiet; then
  log "⚠ Nothing staged — generate-post may not have written queue updates."
  exit 0
fi
git commit -m "content: auto-publish blog post for '$NEXT_KW'" >>"$LOG" 2>&1 || {
  log "✗ git commit failed"; exit 1; }
git push origin main >>"$LOG" 2>&1 || { log "✗ git push failed"; exit 1; }
log "✓ Pushed: '$NEXT_KW' → $SLUG"
