import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/ui/globals.css';
import ContextProvider from './WagmiContextProvider';
import { headers } from 'next/dist/server/request/headers';
import ThemeProviderWrapper from '@/app/ui/providers/ThemeProviderWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Staking Portal',
  description: 'A portal for staking cryptocurrencies',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProviderWrapper>
          <ContextProvider cookies={cookies}>
            <NuqsAdapter>{children}</NuqsAdapter>
          </ContextProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
