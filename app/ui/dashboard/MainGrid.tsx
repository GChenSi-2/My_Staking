import * as React from 'react';
import 'nuqs/adapters/next'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StakingItems from './StakingItems';
import StakingStatistics from './StakingStatistics';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
import { useQueryState } from 'nuqs';


export default function MainGrid() {
  // 用 nuqs 管理 tab 状态
  const [tab, setTab] = useQueryState('tab', {
    history: 'push',
    defaultValue: 0,
    parse: (v) => Number(v),
    serialize: (v) => String(v),
  });

  const tabPanels = [
    <Box key="panel-1">
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
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <StakingItems />
        </Grid>
      </Grid>
    </Box>,
    <Box key="panel-2" sx={{ p: 3 }}>
      <Typography variant="h6">Tab 2 内容</Typography>
    </Box>,
    <Box key="panel-3" sx={{ p: 3 }}>
      <Typography variant="h6">Tab 3 内容</Typography>
    </Box>,
  ];

  // 生成每个 tab 的链接
  const tabLinks = [
    { label: 'Staking', tab: 0 },
    { label: 'Rewards', tab: 1 },
    { label: 'History', tab: 2 },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        MY STAKING PAGE
      </Typography>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 2 }}
        aria-label="staking tabs"
      >
        {tabLinks.map((item) => (
          <Tab
            key={item.tab}
            label={item.label}
            // component={Link}
            // href={`?tab=${item.tab}`}
            shallow
          />
        ))}
      </Tabs>
      {tabPanels[tab]}
    </Box>
  );
}

MainGrid.displayName = 'MainGrid';