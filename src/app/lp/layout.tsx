import { SchemaMarkup } from "@/components/SchemaMarkup";
import { generateLocalBusinessSchema } from "@/lib/schema";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SchemaMarkup schema={generateLocalBusinessSchema()} />
      <main>{children}</main>
    </>
  );
}
