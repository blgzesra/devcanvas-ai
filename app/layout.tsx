import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devcanvas-ai.vercel.app"),

  title: {
    default: "DevCanvas AI",
    template: "%s | DevCanvas AI",
  },

  description:
    "AI-powered developer toolkit to generate README files, regex patterns, markdown, API mocks, fake data, color palettes and more.",

  keywords: [
    "AI",
    "Developer Tools",
    "Next.js",
    "OpenAI",
    "JSON Explain",
    "Regex Generator",
    "Markdown Generator",
    "README Generator",
    "Git Commit Generator",
    "Color Palette Generator",
    "Fake Data Generator",
    "API Mock Generator",
  ],

  authors: [
    {
      name: "Esra Bilgiz",
    },
  ],

  creator: "Esra Bilgiz",

  openGraph: {
    title: "DevCanvas AI",
    description:
      "AI-powered developer toolkit for modern developers.",
    url: "https://devcanvas-ai.vercel.app",
    siteName: "DevCanvas AI",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DevCanvas AI",
    description:
      "AI-powered developer toolkit for modern developers.",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0A0A0A] text-white">
        {children}
      </body>
    </html>
  );
}