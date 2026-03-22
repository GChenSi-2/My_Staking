'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TransactionButton from '../common/TransactionButton';
import ErrorMessage from '../common/ErrorMessage';

interface UnstakingFormProps {
  validatorName: string;
  stakedAmount: string;
  pendingRewards: string;
  onUnstake: (amount: string) => Promise<void>;
}

export default function UnstakingForm({
  validatorName,
  stakedAmount,
  pendingRewards,
  onUnstake,
}: UnstakingFormProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleUnstake = async () => {
    try {
      setLoading(true);
      setError('');
      await onUnstake(amount);
      setAmount('');
    } catch (err: any) {
      setError(err.message || 'Failed to unstake');
    } finally {
      setLoading(false);
    }
  };

  const isValid =
    amount &&
    parseFloat(amount) > 0 &&
    parseFloat(amount) <= parseFloat(stakedAmount);

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Unstake from {validatorName}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Staked: {stakedAmount} SOL
        </Typography>
        <Typography variant="caption" color="success.main" sx={{ ml: 2 }}>
          Rewards: {pendingRewards} SOL
        </Typography>
      </Box>
      <TextField
        label="Amount (SOL)"
        fullWidth
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error && <ErrorMessage error={error} />}
      <TransactionButton
        variant="contained"
        color="error"
        fullWidth
        onClick={handleUnstake}
        loading={loading}
        disabled={!isValid || loading}
      >
        Unstake
      </TransactionButton>
    </Box>
  );
}
