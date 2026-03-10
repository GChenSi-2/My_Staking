import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { TokenETH, TokenUSDC } from '@web3icons/react';

export default function MyLiquidity() {
  return (
    <Box
      sx={{
        mb: 8,
        width: '100%',
        pt: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      }}
    >
      <Box
        sx={{
          mb: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          justifyContent: 'space-between',
        }}
      >
        <Link href="/dashboard" underline="hover" sx={{ fontSize: '1rem' }}>
          Back to Dashboard
        </Link>
        <Box>1 MyToken = 0.00001WETH</Box>
      </Box>
      <Box
        sx={{
          mt: 1,
          mb: 1,
          width: 'auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: '100%',
            bgcolor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TokenETH size={48} variant="branded" />
        </Box>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: '100%',
            bgcolor: 'pink',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            left: -10,
          }}
        >
          <TokenUSDC size={48} variant="branded" />
        </Box>
      </Box>
    </Box>
  );
}
