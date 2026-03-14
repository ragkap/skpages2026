import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import StatusBar from '@/components/layout/StatusBar';

export const metadata: Metadata = {
  title: 'Smartkarma — Insight Network',
  description: 'Smartkarma research platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <Navbar />
          {children}
          <StatusBar />
        </div>
      </body>
    </html>
  );
}
