'use client';

// Update the import path to the correct relative path if config.tsx is in the same folder
import { wagmiAdapter, solanaAdapter, projectId, metadata } from './config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import {
  sepolia,
  mainnet,
  arbitrum,
  solana,
  polygon,
  solanaTestnet,
  solanaDevnet,
} from '@reown/appkit/networks';
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

// Set up queryClient
const queryClient = new QueryClient();

// Create the modal with both adapters
createAppKit({
  adapters: [wagmiAdapter, solanaAdapter],
  projectId,
  networks: [
    mainnet,
    sepolia,
    arbitrum,
    polygon,
    solana,
    solanaTestnet,
    solanaDevnet,
  ],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true,
  },
});

export default function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  // 如果要禁用自动重连，可以注释掉下面这行，直接使用 undefined
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  // 要禁用自动重连，使用这个替代：
  // const initialState = undefined;

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
