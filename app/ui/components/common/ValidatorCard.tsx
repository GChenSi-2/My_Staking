'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

interface ValidatorCardProps {
  name: string;
  address: string;
  apr: number;
  totalStake: string;
  status: 'active' | 'inactive';
  onClick?: () => void;
}

export default function ValidatorCard({ name, address, apr, totalStake, status, onClick }: ValidatorCardProps) {
  return (
    <Card sx={{ cursor: onClick ? 'pointer' : 'default', '&:hover': { boxShadow: onClick ? 3 : 1 } }} onClick={onClick}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6">{name}</Typography>
          <Chip label={status} color={status === 'active' ? 'success' : 'error'} size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontFamily: 'monospace', fontSize: '0.75rem' }}>{address.slice(0, 10)}...{address.slice(-8)}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Box><Typography variant="caption" color="text.secondary">APR</Typography><Typography variant="body1" fontWeight="bold">{apr}%</Typography></Box>
          <Box><Typography variant="caption" color="text.secondary">Total Stake</Typography><Typography variant="body1" fontWeight="bold">{totalStake}</Typography></Box>
        </Box>
      </CardContent>
    </Card>
  );
}
