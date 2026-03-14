'use client';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha } from '@mui/material/styles';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useState, type MouseEvent } from 'react';
import { type TabValue, tabOptions } from './liquidityTabsConfig';

type CustomizedTabsMenuProps = {
  activeTab: TabValue;
  onChange: (value: TabValue) => void;
  visible: boolean;
};

export default function CustomizedTabsMenu({
  activeTab,
  onChange,
  visible,
}: CustomizedTabsMenuProps) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const activeOption = tabOptions.find(option => option.value === activeTab);

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
    <>
      <Button
        variant="text"
        color="inherit"
        onClick={handleMenuOpen}
        endIcon={<KeyboardArrowDownRoundedIcon />}
        sx={theme => ({
          display: visible ? 'flex' : 'none',
          width: 'fit-content',
          minWidth: 90,
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
    </>
  );
}
