'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { type TabValue, tabOptions } from './liquidityTabsConfig';

export {
  defaultActiveTab,
  getActivePanel,
  panelContent,
  tabOptions,
} from './liquidityTabsConfig';

type CustomizedTabsProps = {
  activeTab: TabValue;
  onChange: (value: TabValue) => void;
};

const MENU_SWITCH_WIDTH = 520;

export default function CustomizedTabs({
  activeTab,
  onChange,
}: CustomizedTabsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [shouldUseMenu, setShouldUseMenu] = useState(false);
  const activeOption = tabOptions.find(option => option.value === activeTab);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return;
    }

    const updateLayoutMode = (width: number) => {
      setShouldUseMenu(width < MENU_SWITCH_WIDTH);
    };

    updateLayoutMode(node.clientWidth);

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      updateLayoutMode(entry.contentRect.width);
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMenuSelect = (value: TabValue) => {
    onChange(value);
    handleMenuClose();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        ref={containerRef}
        sx={{
          mb: 2,
          width: '100%',
          p: 0.75,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Button
          variant="text"
          color="inherit"
          onClick={handleMenuOpen}
          endIcon={<KeyboardArrowDownRoundedIcon />}
          sx={theme => ({
            display: shouldUseMenu ? 'flex' : 'none',
            width: 'fit-content',
            minWidth: 140,
            justifyContent: 'space-between',
            border: 'none',
            borderRadius: 1.5,
            px: 2,
            py: 1.25,
            textTransform: 'none',
            fontWeight: 600,
            color: theme.palette.text.primary,
            bgcolor: alpha(theme.palette.primary.main, 0.13),
            '&:hover': {
              border: 'none',
              bgcolor: alpha(theme.palette.primary.main, 0.16),
            },
          })}
        >
          {activeOption?.label ?? activeTab}
        </Button>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: menuAnchor?.clientWidth,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              },
            },
          }}
        >
          {tabOptions.map(option => (
            <MenuItem
              key={option.value}
              selected={option.value === activeTab}
              onClick={() => handleMenuSelect(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ display: shouldUseMenu ? 'none' : 'flex', width: '50%' }}
        >
          {tabOptions.map(option => {
            const isActive = option.value === activeTab;

            return (
              <Button
                key={option.value}
                variant="text"
                color="inherit"
                onClick={() => onChange(option.value)}
                sx={theme => ({
                  flex: 1,
                  justifyContent: 'center',
                  border: 'none',
                  borderRadius: 1.5,
                  px: 2,
                  py: 1.25,
                  textTransform: 'none',
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  bgcolor: isActive
                    ? alpha(theme.palette.primary.main, 0.13)
                    : 'transparent',
                  '&:hover': {
                    border: 'none',
                    bgcolor: isActive
                      ? alpha(theme.palette.primary.main, 0.13)
                      : alpha(theme.palette.primary.main, 0.1),
                  },
                })}
              >
                {option.label}
              </Button>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
