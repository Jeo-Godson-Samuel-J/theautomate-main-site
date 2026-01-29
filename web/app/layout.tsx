import { Roboto } from 'next/font/google';
import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { LoadingProvider } from '@/contexts/LoadingContext';
import LoadingManager from '@/components/ui/LoadingManager';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Auto-Mate - Learn Automation & AI',
  description: 'Master automation and AI with our comprehensive courses and tutorials',
  keywords: ['automation', 'AI', 'machine learning', 'programming', 'courses'],
  authors: [{ name: 'Auto-Mate Team' }],
  openGraph: {
    title: 'Auto-Mate - Learn Automation & AI',
    description: 'Master automation and AI with our comprehensive courses and tutorials',
    url: 'https://theauto-mate.com',
    siteName: 'Auto-Mate',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto-Mate - Learn Automation & AI',
    description: 'Master automation and AI with our comprehensive courses and tutorials',
    creator: '@automate',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth bg-white">
      <body className={`${roboto.variable} font-sans antialiased text-[#023047] bg-white`}
      >
        <LoadingProvider>
          <LoadingManager />
          <Navbar />
          {children}
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}