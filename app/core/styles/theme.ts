import { useMemo } from 'react';

import { blue, orange, red } from '@mui/material/colors';
import { frFR } from '@mui/material/locale';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import useMUIMediaQuery from '@mui/material/useMediaQuery';
import type { Breakpoint } from '@mui/system';

export function useTheme() {
  const prefersDarkMode = useMUIMediaQuery('(prefers-color-scheme: dark)');

  return useMemo(
    () =>
      responsiveFontSizes(
        createTheme(
          {
            typography: {
              fontFamily: 'Graphik, Helvetica Neue, sans-serif'
            },
            palette: {
              mode: prefersDarkMode ? 'dark' : 'light',
              primary: {
                main: prefersDarkMode ? orange[300] : orange[500]
              },
              secondary: { main: blue.A400 },
              error: { main: prefersDarkMode ? red.A100 : red.A700 },
              neutral: { main: prefersDarkMode ? '#fff' : 'rgba(0,0,0,0.87)' }
            },
            components: {
              MuiButton: {
                styleOverrides: {
                  root: {
                    borderRadius: '9999px'
                  }
                }
              }
            }
          },
          frFR
        )
      ),
    [prefersDarkMode]
  );
}

export function useMediaQuery(breakpoint: Breakpoint) {
  const theme = useTheme();
  return useMUIMediaQuery(theme.breakpoints.down(breakpoint));
}
