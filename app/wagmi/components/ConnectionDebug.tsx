'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { useAppKitState } from '@reown/appkit/react';
import { Box, Typography, Paper, Button } from '@mui/material';

export default function ConnectionDebug() {
  const wagmiAccount = useAccount();
  const appKitState = useAppKitState();

  const clearAllStorage = () => {
    if (typeof window !== 'undefined') {
      // 清理所有相关存储
      localStorage.clear();
      sessionStorage.clear();
      
      // 重新加载页面
      window.location.reload();
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        连接状态调试
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Wagmi 状态:
        </Typography>
        <Typography variant="body2">
          连接状态: {wagmiAccount.isConnected ? '✅ 已连接' : '❌ 未连接'}
        </Typography>
        <Typography variant="body2">
          地址: {wagmiAccount.address || '无'}
        </Typography>
        <Typography variant="body2">
          网络: {wagmiAccount.chain?.name || '无'}
        </Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          AppKit 状态:
        </Typography>
        <Typography variant="body2">
          模态框状态: {appKitState.open ? '打开' : '关闭'}
        </Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          本地存储键:
        </Typography>
        <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
          {typeof window !== 'undefined' && 
            Object.keys(localStorage).filter(key => 
              key.includes('wagmi') || 
              key.includes('wallet') || 
              key.includes('appkit') ||
              key.includes('WC_')
            ).map(key => (
              <Typography key={key} variant="body2" sx={{ fontFamily: 'monospace' }}>
                {key}
              </Typography>
            ))
          }
        </Box>
      </Paper>

      <Button variant="contained" color="error" onClick={clearAllStorage}>
        清理所有存储并刷新
      </Button>
    </Box>
  );
}