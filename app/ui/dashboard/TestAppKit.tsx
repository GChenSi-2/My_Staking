'use client';

import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ReownButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      {!isConnected ? (
        <Button variant="contained" onClick={() => open()} sx={{ mb: 2 }}>
          Connect Wallet
        </Button>
      ) : (
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </Typography>
          <Button variant="outlined" onClick={() => open()} sx={{ mr: 1 }}>
            Open Modal
          </Button>
          <Button variant="outlined" onClick={() => open({ view: 'Networks' })}>
            Switch Network
          </Button>
          <Button variant="outlined" onClick={() => open({ view: 'Account' })}>
            Switch Account
          </Button>
          <Button variant="outlined" onClick={() => open({ view: 'Connect' })}>
            Switch Connect
          </Button>
          <Button
            variant="outlined"
            onClick={() => open({ view: 'ApproveTransaction' })}
          >
            ApproveTransaction
          </Button>
          <Button
            variant="outlined"
            onClick={() => open({ view: 'OnRampProviders' })}
          >
            OnRampProviders
          </Button>
          <Button
            variant="outlined"
            onClick={() => open({ view: 'ConnectingWalletConnectBasic' })}
          >
            ConnectingWalletConnectBasic
          </Button>
          <Button
            variant="outlined"
            onClick={() => open({ view: 'WhatIsAWallet' })}
          >
            WhatIsAWallet
          </Button>
          <Button
            variant="outlined"
            onClick={() => open({ view: 'WhatIsANetwork' })}
          >
            WhatIsANetwork
          </Button>
          <Button
            variant="outlined"
            onClick={() => open({ view: 'AllWallets' })}
          >
            AllWallets
          </Button>
          <Button
            variant="outlined"
            onClick={() => open({ view: 'WalletSend' })}
          >
            WalletSend
          </Button>
        </Box>
      )}
    </Box>
  );
}
