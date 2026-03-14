'use client';
import { useState } from 'react';
// import * as React from 'react';
import { styled } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import ToggleIcon from '../icons/toggleIcon';

const drawerWidth = 240;
const collapsedWidth = 90;
const drawerTransitionDuration = 200; // ms

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  transition: theme.transitions.create('width', {
    easing: 'linear',
    duration: drawerTransitionDuration,
  }),
  [`& .${drawerClasses.paper}`]: {
    boxSizing: 'border-box',
    overflowX: 'hidden',
    transition: theme.transitions.create(['width', 'transform'], {
      easing: 'linear',
      duration: drawerTransitionDuration,
    }),
  },
}));

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleDrawer = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* <Button 
      className="absolute right-[-16px] bg-[var(--dg-tc-bg)] !border border-[var(--dg-tc-border)] z-50" 
      onClick={toggleDrawer(false)}>close drawer
    </Button> */}
      <Drawer
        className="relative"
        variant="permanent"
        sx={{
          width: collapsed ? collapsedWidth : drawerWidth,
          display: { xs: 'none', md: 'block' },
          [`& .${drawerClasses.paper}`]: {
            width: collapsed ? collapsedWidth : drawerWidth,
            backgroundColor: 'background.paper',
            overflow: 'visible',
          },
        }}
      >
        <Button
          // className="absolute top-16 right-[-16px] bg-[var(--dg-tc-bg)] !border border-[var(--dg-tc-border)] z-[9999]"
          sx={{
            position: 'absolute',
            top: 30, // 等价于 top-30px
            right: -18, // 等价于 right-[-19px]
            background: 'white',
            border: '1px solid',
            borderColor: 'divider',
            minWidth: 0, // 取消默认最小宽度
            width: 35, // 固定宽度
            height: 35, // 固定高度，正方形
            padding: 0, // 去除内边距
          }}
          onClick={toggleDrawer}
        >
          <ToggleIcon />
        </Button>
        <Divider />
        <Box
          sx={{
            overflow: 'auto', // 这里改成 'hidden' 就不会显示多余内容
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: collapsed ? 'center' : 'stretch',
          }}
        >
          <MenuContent collapsed={collapsed} />
          {/* // 可以渲染时根据 collapsed 只显示 icon 或 icon+text */}
        </Box>
      </Drawer>
    </div>
  );
}
