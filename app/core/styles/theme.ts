import { useMemo } from 'react';

import { amber, blue, green, orange, red } from '@mui/material/colors';
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
              neutral: { main: prefersDarkMode ? '#fff' : 'rgba(0,0,0,0.87)' },
              error: { main: prefersDarkMode ? red.A100 : red.A700 },
              warning: { main: prefersDarkMode ? amber.A100 : amber.A700 },
              info: { main: prefersDarkMode ? blue.A100 : blue.A700 },
              success: { main: prefersDarkMode ? green.A100 : green.A700 }
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
