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
      <div
        className="flex h-screen flex-row"
        style={{
          animation: 'dashboardFadeIn 0.9s cubic-bezier(0.4, 0, 0.2, 1) both',
        }}
      >
        <style>{`
          @keyframes dashboardFadeIn {
            from { opacity: 0; transform: scale(0.98) translateY(8px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
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
