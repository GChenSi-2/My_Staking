import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import MyValidators from './MyValidators';
import MyStaking from './MyStaking';
import TailwindTest from '../test/TailwindTest';

export default function MainGrid() {
  // 用 nuqs 管理 tab 状态
  const [tab, setTab] = useQueryState('tab', {
    history: 'push',
    defaultValue: 0,
    parse: v => Number(v),
    serialize: v => String(v),
  });

  const tabPanels = [
    <Box key="panel-1">
      <MyValidators />
    </Box>,
    <Box key="panel-2" sx={{ p: 0 }}>
      <MyStaking />
    </Box>,
    <Box key="panel-3" sx={{ p: 0 }}>
      <Typography variant="h6">Tab 3 内容</Typography>
      <TailwindTest />
    </Box>,
  ];

  // 生成每个 tab 的链接
  const tabLinks = [
    { label: 'My Validators', tab: 0 },
    { label: 'My Staking', tab: 1 },
    { label: 'Activity', tab: 2 },
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
        {tabLinks.map(item => (
          <Tab
            key={item.tab}
            label={item.label}
            component={Link}
            href={`?tab=${item.tab}`}
            shallow
            sx={{ pl: 2, pr: 3, mr: 1 }}
          />
        ))}
      </Tabs>
      {tabPanels[tab]}
    </Box>
  );
}

MainGrid.displayName = 'MainGrid';
