import type { Metadata, Viewport } from 'next';
import './globals.css';
import Backdrop from '@/components/Backdrop';
import BootSequence from '@/components/BootSequence';
import PageTransition from '@/components/PageTransition';
import ScrollProgress from '@/components/ScrollProgress';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import RegisterDrawer from '@/components/RegisterDrawer';
import Footer from '@/components/Footer';
import ClientInit from '@/components/ClientInit';

export const metadata: Metadata = {
  metadataBase: new URL('https://srmmun.in'),
  title: 'SRM MUN 2026 — 14th Edition',
  description: 'SRM MUN 2026, the 14th Edition. 30, 31 October and 1 November 2026 at SRM Institute of Science and Technology, Kattankulathur, Chennai. 3 days. Be a part of the legacy.',
  icons: {
    icon: '/img/opt/symbol-black.png',
  },
  openGraph: {
    title: 'SRM MUN 2026 — 14th Edition',
    description: '3 days. 30, 31 October and 1 November 2026, SRMIST Kattankulathur.',
    images: ['/img/opt/2026-black.png'],
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#fdfdfc',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className="is-booting">
        <ClientInit />
        <Backdrop />
        <BootSequence />
        <PageTransition />
        <ScrollProgress />
        <Header />
        <MobileNav />
        <RegisterDrawer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
