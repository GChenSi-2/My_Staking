'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import LoadingState from '../common/LoadingState';

interface StakingTransaction {
  id: string;
  type: 'stake' | 'unstake' | 'claim';
  validator: string;
  amount: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

interface StakingHistoryProps {
  transactions: StakingTransaction[];
  loading?: boolean;
}

export default function StakingHistory({ transactions, loading }: StakingHistoryProps) {
  if (loading) return <LoadingState message="Loading history..." />;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Validator</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell sx={{ textTransform: 'capitalize' }}>{tx.type}</TableCell>
              <TableCell>{tx.validator}</TableCell>
              <TableCell align="right">{tx.amount} SOL</TableCell>
              <TableCell>{tx.timestamp.toLocaleDateString()}</TableCell>
              <TableCell align="center"><Chip label={tx.status} color={getStatusColor(tx.status) as any} size="small" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
