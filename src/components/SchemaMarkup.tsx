/**
 * Renders JSON-LD structured data in a script tag.
 * Safe: schema objects are built from our own config, not user input.
 */
export function SchemaMarkup({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
