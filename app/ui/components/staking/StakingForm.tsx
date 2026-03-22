'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TransactionButton from '../common/TransactionButton';
import ErrorMessage from '../common/ErrorMessage';

interface StakingFormProps {
  validatorName: string;
  balance: string;
  minStake: string;
  onStake: (amount: string) => Promise<void>;
}

export default function StakingForm({ validatorName, balance, minStake, onStake }: StakingFormProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleStake = async () => {
    try {
      setLoading(true);
      setError('');
      await onStake(amount);
      setAmount('');
    } catch (err: any) {
      setError(err.message || 'Failed to stake');
    } finally {
      setLoading(false);
    }
  };

  const isValid = amount && parseFloat(amount) >= parseFloat(minStake) && parseFloat(amount) <= parseFloat(balance);

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 2 }}>Stake to {validatorName}</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary">Available Balance: {balance} SOL</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>Min Stake: {minStake} SOL</Typography>
      </Box>
      <TextField label="Amount (SOL)" fullWidth type="number" value={amount} onChange={(e) => setAmount(e.target.value)} sx={{ mb: 2 }} />
      {error && <ErrorMessage error={error} />}
      <TransactionButton variant="contained" fullWidth onClick={handleStake} loading={loading} disabled={!isValid || loading}>Stake</TransactionButton>
    </Box>
  );
}
