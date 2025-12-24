// Adapters configuration
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { mainnet, arbitrum, polygon, sepolia } from '@reown/appkit/networks';

// Project configuration
export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || 'your-project-id-here';

// Wagmi adapter for EVM chains
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet, sepolia, arbitrum, polygon],
});

// Solana adapter for Solana chains
export const solanaAdapter = new SolanaAdapter();

// Set up metadata
export const metadata = {
  name: 'My Staking App',
  description: 'Next.js + Reown AppKit + Multi-chain Staking',
  url: 'https://example.com',
  icons: ['https://example.com/icon.png'],
};
