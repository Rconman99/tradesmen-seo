import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { generateLocalBusinessSchema, generateWebSiteSchema } from "@/lib/schema";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SchemaMarkup schema={generateLocalBusinessSchema()} />
      <SchemaMarkup schema={generateWebSiteSchema()} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
