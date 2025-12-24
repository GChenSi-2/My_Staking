'use client';

import React from 'react';
import { useAccount, useSwitchChain, useChainId, useChains } from 'wagmi';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';

export default function NetworkSwitcher() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const chains = useChains();
  const { switchChain, isPending, error } = useSwitchChain();

  if (!isConnected) {
    return (
      <Card sx={{ maxWidth: 400, margin: 'auto', mt: 2 }}>
        <CardContent>
          <Alert severity="info">请先连接钱包以切换网络</Alert>
        </CardContent>
      </Card>
    );
  }

  const handleNetworkChange = (newChainId: number) => {
    switchChain({ chainId: newChainId });
  };

  const currentChain = chains.find(chain => chain.id === chainId);

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          网络切换
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            当前网络:
          </Typography>
          {currentChain && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label={currentChain.name} color="primary" />
              <Typography variant="body2" color="text.secondary">
                (Chain ID: {currentChain.id})
              </Typography>
            </Box>
          )}
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="network-select-label">选择网络</InputLabel>
          <Select
            labelId="network-select-label"
            value={chainId || ''}
            label="选择网络"
            onChange={e => handleNetworkChange(Number(e.target.value))}
            disabled={isPending}
          >
            {chains.map(chain => (
              <MenuItem key={chain.id} value={chain.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>{chain.name}</Typography>
                  {chain.id === chainId && (
                    <Chip label="当前" color="success" size="small" />
                  )}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isPending && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">
              正在切换网络...
            </Typography>
          </Box>
        )}

        {/*{error && (*/}
        {/*  <Alert severity="error" sx={{ mt: 2 }}>*/}
        {/*    切换网络失败: {error.message}*/}
        {/*  </Alert>*/}
        {/*)}*/}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 1 }}
        >
          支持的网络: {chains.map(chain => chain.name).join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
}
