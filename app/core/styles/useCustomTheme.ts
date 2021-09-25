import { useMemo, CSSProperties } from 'react'
import { frFR } from '@mui/material/locale'
import { createTheme, responsiveFontSizes, useMediaQuery, adaptV4Theme } from '@mui/material';

//@see https://codesandbox.io/s/fontsizetheme-material-demo-forked-l9u05

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    success: CSSProperties
    warning: CSSProperties
    error: CSSProperties
  }

  interface TypographyOptions {
    success?: CSSProperties
    warning: CSSProperties
    error: CSSProperties
  }
}

declare module '@mui/material/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    success: true
    warning: true
    error: true
  }
}

export default function useCustomTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  return useMemo(
    () =>
      responsiveFontSizes(
        createTheme(adaptV4Theme({
          typography: {
            fontFamily: ['Montserrat', 'Helvetica Neue', 'sans-serif'].join(','),
            success: { color: '#4daf7c' },
            warning: { color: '#2980b9' },
            error: { color: '#C91F37' },
          },
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            primary: { main: '#2A2E43' },
            secondary: { main: '#fff' },
            error: { main: '#C91F37' },
          },
        }, frFR))
      ),
    [prefersDarkMode]
  );
}
