'use client';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonProps } from '@mui/material/Button';

interface TransactionButtonProps extends Omit<
  ButtonProps,
  'startIcon' | 'endIcon'
> {
  loading?: boolean;
  loadingText?: string;
}

export default function TransactionButton({
  children,
  loading = false,
  loadingText,
  disabled,
  ...props
}: TransactionButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      startIcon={
        loading ? <CircularProgress size={20} color="inherit" /> : undefined
      }
    >
      {loading && loadingText ? loadingText : children}
    </Button>
  );
}
