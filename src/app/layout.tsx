import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import { siteConfig } from "@/config/site";
import { GoogleAnalytics } from '@next/third-parties/google'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "scoopika",
    "AI",
    "function calling",
    "LLM",
    "open source",
    "AI-powered",
    "context-aware applications",
    "AI agents",
    "AI tools",
    "Developers tools",
  ],
  authors: [
    {
      name: "Kais Radwan",
      url: "https://twitter.com/multineonteam",
    },
  ],
  creator: "Kais Radwan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/scoopika_og.jpg`],
  },
  verification: {
    google: "iZELF-QTTz2xWE3U2-FPllqMtRpVw-1Ok4GZEO2_--A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <Toaster position="bottom-right" />
          {children}
          <GoogleAnalytics gaId="G-3KS7DQFER8" />
          <div className="fixed top-0 left-0 z-50 bg-background w-screen h-screen flex items-center justify-center text-center md:hidden">
            This website does not work on this device size at the moment. <br />
            Please use a larger screen.
          </div>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
