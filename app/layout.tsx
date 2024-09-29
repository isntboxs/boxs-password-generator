import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/globals.css";

import { siteConfig } from "@/config/site-config";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        href: "/favicons/logo-dark.svg",
        url: "/favicons/logo-dark.svg",
      },
      {
        media: "(prefers-color-scheme: light)",
        href: "/favicons/logo-light.svg",
        url: "/favicons/logo-light.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
