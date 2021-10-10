import { useMemo } from 'react'
import { frFR } from '@mui/material/locale'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export function useTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  return useMemo(
    () =>
      responsiveFontSizes(
        createTheme(
          {
            typography: {
              fontFamily: ['Graphik', 'Helvetica Neue', 'sans-serif'].join(','),
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
          },
          frFR
        )
      ),
    [prefersDarkMode]
  )
}
