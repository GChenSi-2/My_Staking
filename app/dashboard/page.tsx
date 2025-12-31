'use client';
// import * as React from 'react';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppTheme from '../theme/AppTheme';
import ShowScheme from '../ui/test/ShowScheme';
import AppNavbar from '../ui/dashboard/AppNavbar';
import Header from '../ui/dashboard/Hearder';
import MainGrid from '../ui/dashboard/MainGrid';
import ReownButton from '../ui/dashboard/TestAppKit';

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        {/* Main content */}
        <Box
          component="main"
          sx={theme => {
            console.log('theme:', theme); // 这里打印 theme
            return {
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              overflow: 'auto',
            };
          }}
        >
          <Stack
            direction="column"
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <AppNavbar />
            <Header />
            <MainGrid />
            <ReownButton />
          </Stack>
        </Box>
      </Box>
    </>
  );
}
