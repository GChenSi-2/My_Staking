'use client';

import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useQueryState } from 'nuqs';
import { TokenETH, TokenUSDC } from '@web3icons/react';
import CustomizedTabs, {
  defaultActiveTab,
  getActivePanel,
} from '../ui/liquidity/CustomizedTabs';
import { isTabValue } from '../ui/liquidity/liquidityTabsConfig';

export default function MyLiquidity() {
  const [activeTab, setActiveTab] = useQueryState('tab', {
    history: 'push',
    defaultValue: defaultActiveTab,
    parse: value => (isTabValue(value) ? value : defaultActiveTab),
    serialize: value => value,
  });
  const ActivePanel = getActivePanel(activeTab);

  return (
    <Box
      sx={{
        mb: 8,
        width: '100%',
        pt: 3,
        display: 'flex',
        flexDirection: 'column',
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
          alignSelf: 'flex-start',
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
      <Grid container spacing={2} sx={{ width: '100%' }}>
        <Grid size={7}>
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              boxShadow: 1,
              borderColor: 'divider',
            }}
          >
            <CustomizedTabs activeTab={activeTab} onChange={setActiveTab} />
            <Box
              sx={{
                width: '100%',
                minHeight: 220,
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                bgcolor: 'background.paper',
              }}
            >
              <ActivePanel />
            </Box>
          </Box>
        </Grid>
        <Grid size={5}>
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              boxShadow: 1,
              borderColor: 'divider',
            }}
          >
            <Box></Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
