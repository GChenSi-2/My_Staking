'use client';

import Grid from '@mui/material/Grid2';
import ValidatorCard from '../common/ValidatorCard';
import LoadingState from '../common/LoadingState';

interface Validator {
  id: string;
  name: string;
  address: string;
  apr: number;
  totalStake: string;
  status: 'active' | 'inactive';
}

interface ValidatorListProps {
  validators: Validator[];
  loading?: boolean;
  onSelectValidator: (validator: Validator) => void;
}

export default function ValidatorList({ validators, loading, onSelectValidator }: ValidatorListProps) {
  if (loading) return <LoadingState message="Loading validators..." />;

  return (
    <Grid container spacing={2}>
      {validators.map((validator) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={validator.id}>
          <ValidatorCard {...validator} onClick={() => onSelectValidator(validator)} />
        </Grid>
      ))}
    </Grid>
  );
}
