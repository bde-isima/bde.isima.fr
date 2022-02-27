import { useMemo } from 'react'
import createCache from '@emotion/cache'
import { frFR } from '@mui/material/locale'
import type { Breakpoint } from '@mui/system'
import useMUIMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export function createEmotionCache() {
  return createCache({ key: 'css' })
}

export function useTheme() {
  const prefersDarkMode = useMUIMediaQuery('(prefers-color-scheme: dark)')

  return useMemo(
    () =>
      responsiveFontSizes(
        createTheme(
          {
            typography: {
              fontFamily: ['Graphik', 'Helvetica Neue', 'sans-serif'].join(','),
              success: { color: '#4daf7c' },
              warning: { color: '#2980b9' },
              error: { color: '#C91F37' }
            },
            palette: {
              mode: prefersDarkMode ? 'dark' : 'light',
              primary: { main: '#2A2E43' },
              secondary: { main: '#fff' },
              error: { main: '#C91F37' }
            }
          },
          frFR
        )
      ),
    [prefersDarkMode]
  )
}

export function useMediaQuery(breakpoint: Breakpoint) {
  const theme = useTheme()
  return useMUIMediaQuery(theme.breakpoints.down(breakpoint))
}
