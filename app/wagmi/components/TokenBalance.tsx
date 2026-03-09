'use client';

import React, { useState } from 'react';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  CircularProgress,
  TextField,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import { formatUnits, isAddress } from 'viem';

// ERC20 ABI (部分)
const erc20Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'decimals', type: 'uint8' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'symbol', type: 'string' }],
  },
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'name', type: 'string' }],
  },
] as const;

export default function TokenBalance() {
  const { address, isConnected, chain } = useAccount();
  const [tokenAddress, setTokenAddress] = useState('');

  // 获取原生代币余额
  const {
    data: nativeBalance,
    isLoading: isNativeLoading,
    error: nativeError,
  } = useBalance({
    address,
  });

  // 获取ERC20代币信息
  const isValidTokenAddress = tokenAddress && isAddress(tokenAddress);

  const { data: tokenBalance, isLoading: isTokenBalanceLoading } =
    useReadContract({
      address: isValidTokenAddress
        ? (tokenAddress as `0x${string}`)
        : undefined,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: address ? [address] : undefined,
      query: { enabled: !!isValidTokenAddress && !!address },
    });

  const { data: tokenDecimals, isLoading: isDecimalsLoading } = useReadContract(
    {
      address: isValidTokenAddress
        ? (tokenAddress as `0x${string}`)
        : undefined,
      abi: erc20Abi,
      functionName: 'decimals',
      query: { enabled: !!isValidTokenAddress },
    }
  );

  const { data: tokenSymbol, isLoading: isSymbolLoading } = useReadContract({
    address: isValidTokenAddress ? (tokenAddress as `0x${string}`) : undefined,
    abi: erc20Abi,
    functionName: 'symbol',
    query: { enabled: !!isValidTokenAddress },
  });

  const { data: tokenName, isLoading: isNameLoading } = useReadContract({
    address: isValidTokenAddress ? (tokenAddress as `0x${string}`) : undefined,
    abi: erc20Abi,
    functionName: 'name',
    query: { enabled: !!isValidTokenAddress },
  });

  if (!isConnected) {
    return (
      <Card sx={{ maxWidth: 500, margin: 'auto', mt: 2 }}>
        <CardContent>
          <Alert severity="info">请先连接钱包以查看代币余额</Alert>
        </CardContent>
      </Card>
    );
  }

  const formatTokenBalance = (balance: bigint, decimals: number) => {
    return parseFloat(formatUnits(balance, decimals)).toFixed(6);
  };

  const isTokenLoading =
    isTokenBalanceLoading ||
    isDecimalsLoading ||
    isSymbolLoading ||
    isNameLoading;

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          代币余额查询
        </Typography>

        {/* 原生代币余额 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            原生代币余额
          </Typography>

          {isNativeLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} />
              <Typography variant="body2">加载中...</Typography>
            </Box>
          )}

          {nativeError && (
            <Alert severity="error">获取余额失败: {nativeError.message}</Alert>
          )}

          {nativeBalance && (
            <Box
              sx={{
                backgroundColor: 'primary.light',
                p: 2,
                borderRadius: 1,
                color: 'primary.contrastText',
              }}
            >
              <Typography variant="h5">
                {parseFloat(formatUnits(nativeBalance.value, nativeBalance.decimals)).toFixed(6)}{' '}
                {nativeBalance.symbol}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                网络: {chain?.name || 'Unknown'}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* ERC20代币查询 */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            ERC20代币查询
          </Typography>

          <TextField
            fullWidth
            label="代币合约地址"
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
            placeholder="0x..."
            sx={{ mb: 2 }}
            helperText="输入ERC20代币的合约地址"
          />

          {isValidTokenAddress && (
            <Box>
              {isTokenLoading && (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
                >
                  <CircularProgress size={20} />
                  <Typography variant="body2">获取代币信息中...</Typography>
                </Box>
              )}

              {!isTokenLoading &&
                tokenBalance !== undefined &&
                tokenDecimals && (
                  <Box
                    sx={{
                      backgroundColor: 'success.light',
                      p: 2,
                      borderRadius: 1,
                      color: 'success.contrastText',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Typography variant="h5">
                        {formatTokenBalance(
                          tokenBalance as bigint,
                          tokenDecimals as number
                        )}
                      </Typography>
                      <Chip
                        label={tokenSymbol || 'Unknown'}
                        size="small"
                        color="primary"
                      />
                    </Box>

                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      代币名称: {tokenName || 'Unknown'}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      小数位数: {tokenDecimals}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        opacity: 0.8,
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                      }}
                    >
                      合约地址: {tokenAddress}
                    </Typography>
                  </Box>
                )}

              {!isTokenLoading &&
                (tokenBalance === undefined || tokenDecimals === undefined) && (
                  <Alert severity="warning">
                    无法获取代币信息，请检查合约地址是否正确
                  </Alert>
                )}
            </Box>
          )}

          {tokenAddress && !isValidTokenAddress && (
            <Alert severity="error">无效的合约地址格式</Alert>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
