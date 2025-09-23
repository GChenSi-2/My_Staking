// import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StakingItems from './StakingItems';
import StakingStatistics from './StakingStatistics';


export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        MY STAKING PAGE
      </Typography>
      <Box
        sx={(theme) => {
          console.log('theme in MainGrid:', theme); // 打印 theme 的值
          return {
            mb: 3,
            width: '100%',
            px: '1rem',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          };
        }}
      >
        <StakingStatistics />
      </Box>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <StakingItems />
        </Grid>
      </Grid> 
    </Box>
  );
}

MainGrid.displayName = 'MainGrid';