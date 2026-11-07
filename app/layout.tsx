import type { Metadata, Viewport } from 'next';
import UIProvider from '@/components/ui/UIProvider';
import SvgSprite from '@/components/ui/SvgSprite';
import './globals.css';

export const metadata: Metadata = {
  title: 'Islohotdan natijaga — Prezident islohotlarining 10 yilligi',
  description: 'O‘zgarishlar, insonlar va aniq natijalar. 2016–2026.',
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        {['noto-serif-latin-400', 'noto-serif-latin-700'].map((f) => (
          <link key={f} rel="preload" href={`/fonts/${f}-normal.woff2`} as="font" type="font/woff2" crossOrigin="" />
        ))}
      </head>
      <body>
        <SvgSprite />
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
