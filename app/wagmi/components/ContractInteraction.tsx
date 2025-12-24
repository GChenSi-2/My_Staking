'use client';

import React, { useState } from 'react';
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
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
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { isAddress, formatUnits, parseUnits } from 'viem';

// 示例 ERC20 合约 ABI
const erc20Abi = [
  // Read functions
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'supply', type: 'uint256' }],
  },
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'name', type: 'string' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'symbol', type: 'string' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'decimals', type: 'uint8' }],
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: 'allowance', type: 'uint256' }],
  },
  // Write functions
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
  },
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
  },
] as const;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ContractInteraction() {
  const { address, isConnected, chain } = useAccount();
  const [contractAddress, setContractAddress] = useState('');
  const [tabValue, setTabValue] = useState(0);

  // Read function states
  const [queryAddress, setQueryAddress] = useState('');
  const [spenderAddress, setSpenderAddress] = useState('');

  // Write function states
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [approveSpender, setApproveSpender] = useState('');
  const [approveAmount, setApproveAmount] = useState('');

  const isValidContractAddress = contractAddress && isAddress(contractAddress);

  // Write contract hook
  const {
    data: hash,
    isPending: isWritePending,
    writeContract,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // Read contract data
  const { data: tokenName } = useReadContract({
    address: isValidContractAddress
      ? (contractAddress as `0x${string}`)
      : undefined,
    abi: erc20Abi,
    functionName: 'name',
    query: { enabled: !!isValidContractAddress },
  });

  const { data: tokenSymbol } = useReadContract({
    address: isValidContractAddress
      ? (contractAddress as `0x${string}`)
      : undefined,
    abi: erc20Abi,
    functionName: 'symbol',
    query: { enabled: !!isValidContractAddress },
  });

  const { data: tokenDecimals } = useReadContract({
    address: isValidContractAddress
      ? (contractAddress as `0x${string}`)
      : undefined,
    abi: erc20Abi,
    functionName: 'decimals',
    query: { enabled: !!isValidContractAddress },
  });

  const { data: totalSupply } = useReadContract({
    address: isValidContractAddress
      ? (contractAddress as `0x${string}`)
      : undefined,
    abi: erc20Abi,
    functionName: 'totalSupply',
    query: { enabled: !!isValidContractAddress },
  });

  const { data: balance } = useReadContract({
    address: isValidContractAddress
      ? (contractAddress as `0x${string}`)
      : undefined,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args:
      queryAddress && isAddress(queryAddress)
        ? [queryAddress as `0x${string}`]
        : undefined,
    query: {
      enabled:
        !!isValidContractAddress && !!queryAddress && isAddress(queryAddress),
    },
  });

  const { data: allowance } = useReadContract({
    address: isValidContractAddress
      ? (contractAddress as `0x${string}`)
      : undefined,
    abi: erc20Abi,
    functionName: 'allowance',
    args:
      queryAddress &&
      isAddress(queryAddress) &&
      spenderAddress &&
      isAddress(spenderAddress)
        ? [queryAddress as `0x${string}`, spenderAddress as `0x${string}`]
        : undefined,
    query: {
      enabled:
        !!isValidContractAddress &&
        !!queryAddress &&
        isAddress(queryAddress) &&
        !!spenderAddress &&
        isAddress(spenderAddress),
    },
  });

  const handleTransfer = () => {
    if (
      !isValidContractAddress ||
      !transferTo ||
      !transferAmount ||
      !tokenDecimals
    )
      return;

    writeContract({
      address: contractAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: 'transfer',
      args: [
        transferTo as `0x${string}`,
        parseUnits(transferAmount, tokenDecimals as number),
      ],
    });
  };

  const handleApprove = () => {
    if (
      !isValidContractAddress ||
      !approveSpender ||
      !approveAmount ||
      !tokenDecimals
    )
      return;

    writeContract({
      address: contractAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: 'approve',
      args: [
        approveSpender as `0x${string}`,
        parseUnits(approveAmount, tokenDecimals as number),
      ],
    });
  };

  if (!isConnected) {
    return (
      <Card sx={{ maxWidth: 800, margin: 'auto', mt: 2 }}>
        <CardContent>
          <Alert severity="info">请先连接钱包以与智能合约交互</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          智能合约交互 (ERC20 示例)
        </Typography>

        {/* 合约地址输入 */}
        <TextField
          fullWidth
          label="ERC20合约地址"
          value={contractAddress}
          onChange={e => setContractAddress(e.target.value)}
          placeholder="0x..."
          sx={{ mb: 2 }}
          helperText="输入要交互的ERC20代币合约地址"
          error={contractAddress !== '' && !isValidContractAddress}
        />

        {/* 合约信息显示 */}
        {isValidContractAddress && (tokenName || tokenSymbol) && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              backgroundColor: 'primary.light',
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" color="primary.contrastText">
              {tokenName} ({tokenSymbol})
            </Typography>
            <Typography
              variant="body2"
              color="primary.contrastText"
              sx={{ opacity: 0.8 }}
            >
              小数位数: {tokenDecimals}
            </Typography>
            {totalSupply && tokenDecimals && (
              <Typography
                variant="body2"
                color="primary.contrastText"
                sx={{ opacity: 0.8 }}
              >
                总供应量:{' '}
                {formatUnits(totalSupply as bigint, tokenDecimals as number)}{' '}
                {tokenSymbol}
              </Typography>
            )}
          </Box>
        )}

        {isValidContractAddress && (
          <>
            {/* 功能标签页 */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
              >
                <Tab label="读取数据" />
                <Tab label="写入交易" />
              </Tabs>
            </Box>

            {/* 读取数据面板 */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* 余额查询 */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>查询余额</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      label="查询地址"
                      value={queryAddress}
                      onChange={e => setQueryAddress(e.target.value)}
                      placeholder="0x..."
                      sx={{ mb: 2 }}
                    />
                    {balance !== undefined &&
                      tokenDecimals &&
                      queryAddress &&
                      isAddress(queryAddress) && (
                        <Alert severity="success">
                          余额:{' '}
                          {formatUnits(
                            balance as bigint,
                            tokenDecimals as number
                          )}{' '}
                          {tokenSymbol}
                        </Alert>
                      )}
                  </AccordionDetails>
                </Accordion>

                {/* 授权额度查询 */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>查询授权额度</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      label="所有者地址"
                      value={queryAddress}
                      onChange={e => setQueryAddress(e.target.value)}
                      placeholder="0x..."
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="被授权地址"
                      value={spenderAddress}
                      onChange={e => setSpenderAddress(e.target.value)}
                      placeholder="0x..."
                      sx={{ mb: 2 }}
                    />
                    {allowance !== undefined && tokenDecimals && (
                      <Alert severity="success">
                        授权额度:{' '}
                        {formatUnits(
                          allowance as bigint,
                          tokenDecimals as number
                        )}{' '}
                        {tokenSymbol}
                      </Alert>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </TabPanel>

            {/* 写入交易面板 */}
            <TabPanel value={tabValue} index={1}>
              {/* 交易状态 */}
              {isConfirmed && hash && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  交易已确认！
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

              {writeError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  交易失败: {writeError.message}
                </Alert>
              )}

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* 转账功能 */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>转账代币</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      label="接收地址"
                      value={transferTo}
                      onChange={e => setTransferTo(e.target.value)}
                      placeholder="0x..."
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label={`转账数量 (${tokenSymbol})`}
                      value={transferAmount}
                      onChange={e => setTransferAmount(e.target.value)}
                      placeholder="1.0"
                      type="number"
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleTransfer}
                      disabled={
                        !transferTo ||
                        !transferAmount ||
                        !isAddress(transferTo) ||
                        isWritePending ||
                        isConfirming
                      }
                    >
                      {isWritePending || isConfirming ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                          {isWritePending ? '确认中...' : '等待确认...'}
                        </>
                      ) : (
                        '转账'
                      )}
                    </Button>
                  </AccordionDetails>
                </Accordion>

                {/* 授权功能 */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>授权代币</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      label="被授权地址"
                      value={approveSpender}
                      onChange={e => setApproveSpender(e.target.value)}
                      placeholder="0x..."
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label={`授权数量 (${tokenSymbol})`}
                      value={approveAmount}
                      onChange={e => setApproveAmount(e.target.value)}
                      placeholder="1.0"
                      type="number"
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleApprove}
                      disabled={
                        !approveSpender ||
                        !approveAmount ||
                        !isAddress(approveSpender) ||
                        isWritePending ||
                        isConfirming
                      }
                    >
                      {isWritePending || isConfirming ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                          {isWritePending ? '确认中...' : '等待确认...'}
                        </>
                      ) : (
                        '授权'
                      )}
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </TabPanel>
          </>
        )}
      </CardContent>
    </Card>
  );
}
