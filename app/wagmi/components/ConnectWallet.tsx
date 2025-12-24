'use client';

import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { useAppKit } from '@reown/appkit/react';

export default function ConnectWallet() {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  // 改进的断开连接功能
  const handleDisconnect = async () => {
    try {
      console.log('开始断开连接...');

      // 使用wagmi的disconnect
      disconnect();

      // 清理本地存储中的连接状态
      if (typeof window !== 'undefined') {
        // 清理常见的钱包存储键
        const keysToRemove = [
          'wagmi.store',
          'wagmi.wallet',
          'walletconnect',
          'WC_WALLET_CONNECT_V2_CLIENT',
          '-walletlink:https://www.walletlink.org:Addresses',
          '-walletlink:https://www.walletlink.org:DefaultChainId',
        ];

        keysToRemove.forEach(key => {
          localStorage.removeItem(key);
        });

        // 清理sessionStorage
        sessionStorage.clear();
      }

      console.log('断开连接完成');
    } catch (error) {
      console.error('断开连接失败:', error);
      // 如果出错，显示错误信息但不刷新页面
      alert('断开连接时遇到问题，请手动在钱包中断开连接或刷新页面');
    }
  };

  if (isConnected && address) {
    return (
      <Card sx={{ maxWidth: 400, margin: 'auto', mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="success.main">
            ✅ 钱包已连接
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              钱包地址:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                wordBreak: 'break-all',
                backgroundColor: 'grey.100',
                padding: 1,
                borderRadius: 1,
              }}
            >
              {address}
            </Typography>
          </Box>

          {chain && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                当前网络:
              </Typography>
              <Chip
                label={chain.name}
                color="primary"
                size="small"
                sx={{ mr: 1 }}
              />
              <Chip
                label={`Chain ID: ${chain.id}`}
                variant="outlined"
                size="small"
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={() => open()} size="small">
              管理钱包
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDisconnect}
              size="small"
            >
              断开连接
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 2 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          连接您的钱包
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          使用Web3钱包连接到去中心化应用
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => open()}
          sx={{ minWidth: 200 }}
        >
          连接钱包
        </Button>
      </CardContent>
    </Card>
  );
}
