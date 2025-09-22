'use client'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StakingIcon from '../icons/Staking';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import ColorModeSelect from './ColorModeSelect';
import Box from '@mui/material/Box';

const mainListItems = [
  { text: 'Staking', icon: <StakingIcon className="text-gray-400" />, href: '/dashboard' },
  { 
    text: 'Home', 
    icon: <HomeRoundedIcon />, 
    href: '', 
    children: [
      { text: 'Sub Home 1', href: '/dashboard/home1' },
      { text: 'Sub Home 2', href: '/dashboard/home2' }
    ]
  },
  { text: 'Analytics', icon: <AnalyticsRoundedIcon />, href: '' },
  { 
    text: 'Clients', 
    icon: <PeopleRoundedIcon />, 
    href: '', 
    children: [
      { text: 'Client A', href: '/dashboard/clientA' },
      { text: 'Client B', href: '/dashboard/clientB' }
    ]
  },
];

export default function MenuContent({ collapsed }: { collapsed: boolean }) {
    const pathname = usePathname();
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const handleToggle = (idx: number) => {
      setOpenIndexes((prev) =>
        prev.includes(idx) ? prev.filter(i => i !== idx) : [idx]
      );
    };

    return (
        <Stack
          sx={{
            flexGrow: 1,
            p: 1,
            justifyContent: 'space-between',
            width: '80%',
            height: '100vh', // 保证菜单高度撑满
          }}
        >
          <List dense>
            {mainListItems.map((item, index) => (
            <div key={index}>
              <ListItem disablePadding sx={{ display: 'block', mt: 1 }}>
                <ListItemButton
                  dense
                  selected={pathname === item.href}
                  sx={{
                    px: 2,
                    py: 2,
                    width: collapsed ? 35 : 'auto',
                    height: 35,
                    minWidth: 0,
                    minHeight: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: collapsed ? '50%' : 2
                  }}
                  onClick={() => item.children ? handleToggle(index) : undefined}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 1, justifyContent: 'center' }}>
                    {item.icon}
                  </ListItemIcon>
                  {collapsed ? null : (
                    <>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{ fontSize: '20px' }}
                      />
                      {item.children && (openIndexes.includes(index) ? <ExpandLess /> : <ExpandMore />)}
                    </>
                  )}
                </ListItemButton>
              </ListItem>
              {/* 次级菜单 */}
              {item.children && openIndexes.includes(index) && !collapsed && (
                <List dense component="div"  sx={{ pl: 0 }}>
                  {item.children.map((child, cidx) => (
                    //去除 ListItem 的左右内边距（padding），让内容更贴边显示。
                    <ListItem key={cidx} disablePadding> 
                      <ListItemButton
                        component={Link}
                        href={child.href}
                        selected={pathname === child.href}
                        sx={{ pl: 6, borderRadius: 2 }}
                      >
                        <ListItemText primary={child.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
            ))}
          </List>
          {/* <Box sx={{ mt: 2 }}>
            <ColorModeSelect />
          </Box> */}
        </Stack>
    );
}