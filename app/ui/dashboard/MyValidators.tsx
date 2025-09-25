import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StakingItems from './StakingItems';
import StakingStatistics from './StakingStatistics';

export default function MyValidators() {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={theme => {
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
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <StakingItems />
        </Grid>
      </Grid>
    </Box>
  );
}
