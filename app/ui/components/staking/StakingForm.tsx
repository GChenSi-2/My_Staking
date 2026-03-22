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

export default function StakingForm({
  validatorName,
  balance,
  minStake,
  onStake,
}: StakingFormProps) {
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

  const isValid =
    amount &&
    parseFloat(amount) >= parseFloat(minStake) &&
    parseFloat(amount) <= parseFloat(balance);

  return (
    <Box className="w-full">
      <Typography
        variant="body2"
        className="mb-2 text-sm font-medium text-[var(--template-palette-text-primary)]"
      >
        Stake to {validatorName}
      </Typography>
      <Box className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-[var(--template-palette-divider)] bg-[var(--template-palette-background-paper)] px-3 py-2">
        <Typography
          variant="caption"
          className="text-[var(--template-palette-text-secondary)]"
        >
          Available Balance: {balance} SOL
        </Typography>
        <Typography
          variant="caption"
          className="text-[var(--template-palette-text-secondary)]"
        >
          Min Stake: {minStake} SOL
        </Typography>
      </Box>
      <TextField
        label="Amount (SOL)"
        fullWidth
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="mb-3"
      />
      {error && <ErrorMessage error={error} />}
      <TransactionButton
        variant="contained"
        fullWidth
        onClick={handleStake}
        loading={loading}
        disabled={!isValid || loading}
        className="w-full rounded-xl normal-case"
      >
        Stake
      </TransactionButton>
    </Box>
  );
}
