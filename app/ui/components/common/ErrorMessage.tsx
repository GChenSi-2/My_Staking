'use client';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface ErrorMessageProps {
  error: string | Error;
  onRetry?: () => void;
}

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const message = typeof error === 'string' ? error : error.message;
  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Alert severity="error" action={onRetry && <Button color="inherit" size="small" onClick={onRetry}>Retry</Button>}>{message}</Alert>
    </Box>
  );
}
