import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { ViewedProvider } from '@/components/viewed-provider';

export const metadata: Metadata = {
  title: 'APOD Explorer | NASA Astronomy Picture of the Day',
  description: 'Explore NASA Astronomy Picture of the Day with a fast, accessible Next.js experience.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ViewedProvider>
          <SiteHeader />
          {children}
        </ViewedProvider>
        <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
          <p>Data provided by NASA&apos;s Astronomy Picture of the Day API.</p>
        </footer>
      </body>
    </html>
  );
}
