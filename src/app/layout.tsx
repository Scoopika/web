import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { GoogleAnalytics } from "@next/third-parties/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
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
    "AI development",
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
    description: "Integrate personalized multimodal AI agents in your application in minutes",
    siteName: siteConfig.name,
    images: [
      "/images/developer-platform.png"
    ]
  },
  verification: {
    google: "iZELF-QTTz2xWE3U2-FPllqMtRpVw-1Ok4GZEO2_--A",
  },
  metadataBase: new URL("https://scoopika.com")
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
          fontSans.variable
        )}
      >
        <Providers>
          <Toaster position="bottom-right" />
          <main>{children}</main>
          <GoogleAnalytics gaId="G-3KS7DQFER8" />
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
