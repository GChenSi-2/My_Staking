import { Geist, Geist_Mono } from 'next/font/google';
import SideMenu from '../ui/dashboard/SideMenu';
import ThemeProviderWrapper from '../ui/providers/ThemeProviderWrapper';
// import '@/globals.css'; // Moved to app/layout.tsx as required by Next.js

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProviderWrapper>
      <div className="flex h-screen flex-row">
        <div className="w-64 flex-col">
          <SideMenu />
        </div>
        <div
          className={`flex-grow p-6 md:overflow-y-auto md:p-12 ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </div>
      </div>
    </ThemeProviderWrapper>
  );
}
