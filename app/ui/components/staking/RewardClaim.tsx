'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TransactionButton from '../common/TransactionButton';
import ErrorMessage from '../common/ErrorMessage';

interface RewardClaimProps {
  validatorName: string;
  pendingRewards: string;
  onClaim: () => Promise<void>;
}

export default function RewardClaim({
  validatorName,
  pendingRewards,
  onClaim,
}: RewardClaimProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleClaim = async () => {
    try {
      setLoading(true);
      setError('');
      await onClaim();
    } catch (err: any) {
      setError(err.message || 'Failed to claim rewards');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Claim Rewards from {validatorName}
      </Typography>
      <Box sx={{ mb: 3, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
        <Typography variant="caption" color="success.dark">
          Pending Rewards
        </Typography>
        <Typography variant="h5" color="success.dark" fontWeight="bold">
          {pendingRewards} SOL
        </Typography>
      </Box>
      {error && <ErrorMessage error={error} />}
      <TransactionButton
        variant="contained"
        color="success"
        fullWidth
        onClick={handleClaim}
        loading={loading}
        disabled={parseFloat(pendingRewards) === 0 || loading}
      >
        Claim Rewards
      </TransactionButton>
    </Box>
  );
}
