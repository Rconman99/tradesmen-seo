import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { business } from "@/config/business";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${business.shortName} | ${business.tagline}`,
    template: `%s | ${business.shortName}`,
  },
  description: business.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: business.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
