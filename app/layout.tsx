import type { Metadata, Viewport } from "next";
import UIProvider from "@/components/ui/UIProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Islohotdan natijaga — Prezident islohotlarining 10 yilligi",
  description: "Oʻzgarishlar, insonlar va aniq natijalar. Yangi Oʻzbekiston: 2016–2026.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b2350" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preload" href="/fonts/noto-serif-display-latin-wdth-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/noto-serif-latin-wdth-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
