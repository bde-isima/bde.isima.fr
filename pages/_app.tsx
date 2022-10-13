import { StrictMode, Suspense, useEffect } from 'react';

import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import type { BDEAppProps } from 'global';
import NProgress from 'nprogress';

import Head from 'next/head';
import Script from 'next/script';

import { ErrorBoundary } from '@blitzjs/next';
import { useQueryErrorResetBoundary } from '@blitzjs/rpc';

import { withBlitz } from 'app/blitz-client';
import Splash from 'app/components/common/Splash';
import RootErrorFallback from 'app/core/lib/ErrorBoundary';
import * as gtag from 'app/core/lib/gtag';
import { useRouter } from 'app/core/lib/router';
import 'app/core/styles/index.css';
import { useTheme } from 'app/core/styles/theme';

import packageJson from '../package.json';

({ appName: globalThis.appName, website: globalThis.website, version: globalThis.version } = packageJson);

export default withBlitz(function App({ Component, pageProps }: BDEAppProps) {
  const theme = useTheme();
  const { router } = useRouter();
  const { reset } = useQueryErrorResetBoundary();

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start();

    const handleRouteChange = (url: string) => {
      NProgress.done();
      gtag.pageview(url);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <StrictMode>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <CssBaseline />

      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ErrorBoundary FallbackComponent={RootErrorFallback} onReset={reset}>
            <Suspense fallback={<Splash />}>{getLayout(<Component {...pageProps} />)}</Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </StyledEngineProvider>

      <Script id="gtag" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`} />
      <Script
        id="gtag_init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                page_path: window.location.pathname,
            });
        `
        }}
      />
    </StrictMode>
  );
});
