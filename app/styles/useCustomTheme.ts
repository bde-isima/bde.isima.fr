import { useMemo } from 'react';
import { frFR } from '@material-ui/core/locale';
import { createMuiTheme, responsiveFontSizes, useMediaQuery } from '@material-ui/core';

export default function useCustomTheme() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return useMemo(() => responsiveFontSizes(createMuiTheme({
        typography: {
            fontFamily: ['Montserrat', 'Helvetica Neue', 'sans-serif'].join(',')
        },
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            common: { black: '#222222' },
            primary: { main: '#2A2E43' },
            secondary: { main: '#fff' },
            error: { main: '#C91F37' },
        },
    }, frFR)), [prefersDarkMode]);
}