'use client';

import React, { useState } from 'react';
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useBalance,
} from 'wagmi';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  TextField,
  Button,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Link,
} from '@mui/material';
import { parseEther, isAddress, formatEther, formatUnits } from 'viem';

export default function TransactionSender() {
  const { address, isConnected, chain } = useAccount();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const { data: balance } = useBalance({ address });

  const {
    data: hash,
    isPending: isSendPending,
    sendTransaction,
    error: sendError,
    reset: resetSend,
  } = useSendTransaction();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const steps = ['填写交易信息', '确认交易', '等待确认'];

  const handleSendTransaction = async () => {
    if (!toAddress || !amount) {
      return;
    }

    try {
      setActiveStep(1);
      sendTransaction({
        to: toAddress as `0x${string}`,
        value: parseEther(amount),
      });
    } catch (error) {
      console.error('Transaction error:', error);
      setActiveStep(0);
    }
  };

  const resetForm = () => {
    setToAddress('');
    setAmount('');
    setActiveStep(0);
    resetSend();
  };

  const isValidAddress = toAddress && isAddress(toAddress);
  const isValidAmount = amount && parseFloat(amount) > 0;
  const hasEnoughBalance =
    balance && amount && parseFloat(amount) <= parseFloat(formatUnits(balance.value, balance.decimals));

  React.useEffect(() => {
    if (isSendPending) {
      setActiveStep(1);
    } else if (isConfirming) {
      setActiveStep(2);
    } else if (isConfirmed) {
      setActiveStep(3);
    }
  }, [isSendPending, isConfirming, isConfirmed]);

  if (!isConnected) {
    return (
      <Card sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
        <CardContent>
          <Alert severity="info">请先连接钱包以发送交易</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          发送交易
        </Typography>

        {/* 交易进度 */}
        <Box sx={{ mb: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* 余额显示 */}
        {balance && (
          <Box
            sx={{ mb: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}
          >
            <Typography variant="body2" color="text.secondary">
              当前余额:
            </Typography>
            <Typography variant="h6">
              {parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(6)} {balance.symbol}
            </Typography>
          </Box>
        )}

        {/* 成功状态 */}
        {isConfirmed && hash && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            action={
              <Button color="inherit" size="small" onClick={resetForm}>
                发送新交易
              </Button>
            }
          >
            <Typography variant="body2">交易已成功确认！</Typography>
            {chain?.blockExplorers?.default && (
              <Link
                href={`${chain.blockExplorers.default.url}/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'block', mt: 1 }}
              >
                在区块浏览器中查看
              </Link>
            )}
          </Alert>
        )}

        {/* 错误显示 */}
        {(sendError || confirmError) && (
          <Alert severity="error" sx={{ mb: 3 }}>
            交易失败: {(sendError || confirmError)?.message}
          </Alert>
        )}

        {/* 交易表单 */}
        {!isConfirmed && (
          <Box
            component="form"
            onSubmit={e => {
              e.preventDefault();
              handleSendTransaction();
            }}
          >
            <TextField
              fullWidth
              label="接收地址"
              value={toAddress}
              onChange={e => setToAddress(e.target.value)}
              placeholder="0x..."
              sx={{ mb: 2 }}
              error={toAddress !== '' && !isValidAddress}
              helperText={
                toAddress !== '' && !isValidAddress
                  ? '无效的地址格式'
                  : '输入接收方的以太坊地址'
              }
              disabled={isSendPending || isConfirming}
            />

            <TextField
              fullWidth
              label={`发送数量 (${balance?.symbol || 'ETH'})`}
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.001"
              type="number"
              slotProps={{ htmlInput: { step: '0.000001' } }}
              sx={{ mb: 2 }}
              error={amount !== '' && (!isValidAmount || !hasEnoughBalance)}
              helperText={
                amount !== '' && !isValidAmount
                  ? '请输入有效数量'
                  : amount !== '' && !hasEnoughBalance
                    ? '余额不足'
                    : `输入要发送的${balance?.symbol || 'ETH'}数量`
              }
              disabled={isSendPending || isConfirming}
            />

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                disabled={
                  !isValidAddress ||
                  !isValidAmount ||
                  !hasEnoughBalance ||
                  isSendPending ||
                  isConfirming
                }
                sx={{ minWidth: 120 }}
              >
                {isSendPending ? '发送中...' : '发送交易'}
              </Button>

              {(isSendPending || isConfirming) && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" color="text.secondary">
                    {isSendPending && '等待钱包确认...'}
                    {isConfirming && '等待网络确认...'}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* 交易哈希显示 */}
        {hash && !isConfirmed && (
          <Box
            sx={{ mt: 3, p: 2, backgroundColor: 'info.light', borderRadius: 1 }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              交易哈希:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                wordBreak: 'break-all',
              }}
            >
              {hash}
            </Typography>
            {chain?.blockExplorers?.default && (
              <Link
                href={`${chain.blockExplorers.default.url}/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'block', mt: 1 }}
              >
                在区块浏览器中跟踪
              </Link>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
