'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import ConnectWallet from './components/ConnectWallet';
import NetworkSwitcher from './components/NetworkSwitcher';
import TokenBalance from './components/TokenBalance';
import TransactionSender from './components/TransactionSender';
import ContractInteraction from './components/ContractInteraction';
import ConnectionDebug from './components/ConnectionDebug';

export default function WagmiDemo() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Web3 区块链交互演示
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mb: 2 }}
        >
          基于 Wagmi + Reown 的区块链应用组件集合
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          这里演示了与区块链交互的各种功能，包括钱包连接、网络切换、余额查询、交易发送和智能合约交互
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* 调试信息 */}
        <Grid size={12}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              🔍 连接调试
            </Typography>
            <ConnectionDebug />
          </Box>
        </Grid>

        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* 钱包连接 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              🔗 钱包连接
            </Typography>
            <ConnectWallet />
          </Box>
        </Grid>

        {/* 网络切换 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              🌐 网络切换
            </Typography>
            <NetworkSwitcher />
          </Box>
        </Grid>

        {/* 代币余额 */}
        <Grid size={12}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              💰 代币余额查询
            </Typography>
            <TokenBalance />
          </Box>
        </Grid>

        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* 交易发送 */}
        <Grid size={12}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              📤 发送交易
            </Typography>
            <TransactionSender />
          </Box>
        </Grid>

        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* 智能合约交互 */}
        <Grid size={12}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              📋 智能合约交互
            </Typography>
            <ContractInteraction />
          </Box>
        </Grid>
      </Grid>

      {/* 功能说明 */}
      <Paper sx={{ p: 4, mt: 4, backgroundColor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          📚 功能说明
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" gutterBottom>
              🔗 钱包连接组件
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • 支持多种钱包连接 (MetaMask, WalletConnect, etc.)
              <br />
              • 显示连接状态和钱包信息
              <br />• 一键断开连接功能
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              🌐 网络切换组件
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • 支持多链网络切换
              <br />
              • 显示当前网络状态
              <br />• 错误处理和状态提示
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              💰 代币余额组件
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • 查询原生代币余额
              <br />
              • 支持ERC20代币查询
              <br />• 实时余额更新
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" gutterBottom>
              📤 交易发送组件
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • 发送原生代币
              <br />
              • 交易状态跟踪
              <br />• 区块浏览器链接
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              📋 智能合约交互组件
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • ERC20合约读写操作
              <br />
              • 代币转账和授权
              <br />• 合约信息查询
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
