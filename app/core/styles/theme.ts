import { useMemo } from 'react';

import { amber, blue, green, indigo, red } from '@mui/material/colors';
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
                main: prefersDarkMode ? indigo[200] : indigo[700]
              },
              neutral: { main: prefersDarkMode ? '#fff' : 'rgba(0,0,0,0.87)' },
              error: { main: prefersDarkMode ? red[300] : red[700] },
              warning: { main: prefersDarkMode ? amber[300] : amber[700] },
              info: { main: prefersDarkMode ? blue[300] : blue[700] },
              success: { main: prefersDarkMode ? green[300] : green[700] }
            },
            components: {
              MuiAppBar: {
                defaultProps: {
                  color: 'transparent'
                },
                styleOverrides: {
                  root: {
                    borderLeft: 'none',
                    borderRight: 'none',
                    backgroundColor: 'rgb(var(--color-bl0) / 0.9)',
                    backdropFilter: 'blur(24px)'
                  }
                }
              },
              MuiButton: {
                defaultProps: {
                  disableElevation: true
                }
              },
              MuiFab: {
                styleOverrides: {
                  root: {
                    boxShadow:
                      '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
                  }
                }
              },
              MuiCard: {
                defaultProps: {
                  variant: 'outlined'
                }
              },
              MuiPaper: {
                defaultProps: {
                  variant: 'outlined'
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
