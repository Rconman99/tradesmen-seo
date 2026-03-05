import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { business } from "@/config/business";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.website),
  title: {
    default: `${business.shortName} | ${business.tagline}`,
    template: `%s | ${business.shortName}`,
  },
  description: business.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: business.website,
    siteName: business.name,
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: `${business.name} — ${business.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: business.name,
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <GoogleTagManager />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
