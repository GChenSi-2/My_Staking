// Wagmi adapter configuration
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, arbitrum, polygon } from '@reown/appkit/networks';

// Project configuration
export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || 'your-project-id-here';

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet, arbitrum, polygon],
});

// Set up metadata
const metadata = {
  name: 'appkit-example',
  description: 'AppKit Example',
  url: 'https://appkitexampleapp.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};
