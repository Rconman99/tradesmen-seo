import { business } from "@/config/business";
import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_RSS_QUERY } from "@/sanity/lib/queries";

interface RssPost {
  title: string | null;
  slug: { current: string } | null;
  excerpt: string | null;
  publishedAt: string | null;
}

export async function GET() {
  const posts = await sanityFetch<RssPost[]>({
    query: POSTS_RSS_QUERY,
    tags: ["post"],
  });

  const items = posts
    .map((post) => {
      const link = `${business.website}/blog/${post.slug?.current}`;
      return `    <item>
      <title><![CDATA[${post.title || "Untitled"}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${post.excerpt || ""}]]></description>
      ${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${business.name} Blog</title>
    <link>${business.website}/blog</link>
    <description>${business.tagline}. Tips, news, and project updates.</description>
    <language>en-us</language>
    <atom:link href="${business.website}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
