import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


export default function StakingStatistics() {
  return <Stack
    direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={2}
    sx={{ width: '100%', justifyContent: 'space-between', px: 1, py: 1.5 }}
  >
    <Stack sx={{ flex: 1, }}>
      <Typography variant="body2" color="text.secondary">Total Value Locked</Typography>
      <Typography variant="h6" color="text.primary">$123,456</Typography>
    </Stack>
    <Stack sx={{ flex: 1 }}>
      <Typography variant="body2" color="text.secondary">Total Staked</Typography>
      <Typography variant="h6" color="text.primary">$123,456</Typography> 
    </Stack>
    <Stack sx={{ flex: 1 }}>
      <Typography variant="body2" color="text.secondary">Total Rewards</Typography>
      <Typography variant="h6" color="text.primary">$123,456</Typography>
    </Stack>
    <Stack sx={{ flex: 1 }}>
      <Typography variant="body2" color="text.secondary">Total Unstaked</Typography>
      <Typography variant="h6" color="text.primary">$123,456</Typography>
    </Stack>
  </Stack>;
}