'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { type TabValue, tabOptions } from './liquidityTabsConfig';
import CustomizedTabsMenu from './CustomizedTabsMenu';

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
  const [shouldUseMenu, setShouldUseMenu] = useState(false);

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
        <CustomizedTabsMenu
          activeTab={activeTab}
          onChange={onChange}
          visible={shouldUseMenu}
        />
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
                    ? alpha(theme.palette.primary.main, 0.15)
                    : 'transparent',
                  '&:hover': {
                    border: 'none',
                    bgcolor: isActive
                      ? alpha(theme.palette.primary.main, 0.15)
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
