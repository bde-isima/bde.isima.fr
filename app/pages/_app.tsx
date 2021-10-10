import 'app/core/styles/index.css'

import NProgress from 'nprogress'
import { Head, Script } from 'blitz'
import type { BDEAppProps } from 'global'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { StrictMode, Suspense, useEffect } from 'react'

import * as gtag from 'app/core/lib/gtag'
import packageJson from '../../package.json'
import { useRouter } from 'app/core/lib/router'
import { useTheme } from 'app/core/styles/theme'
import Splash from 'app/components/common/Splash'
import ErrorBoundary from 'app/core/lib/ErrorBoundary'
import createEmotionCache from 'app/core/lib/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

;({
  appName: globalThis.appName,
  website: globalThis.website,
  version: globalThis.version,
} = packageJson)

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: BDEAppProps) {
  const theme = useTheme()
  const { router } = useRouter()

  const getLayout = Component.getLayout || ((page) => page)

  useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start()

    const handleRouteChange = (url: string) => {
      NProgress.done()
      gtag.pageview(url)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <StrictMode>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
        </Head>

        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Suspense fallback={<Splash />}>{getLayout(<Component {...pageProps} />)}</Suspense>
          </ErrorBoundary>
        </ThemeProvider>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                page_path: window.location.pathname,
            });
        `,
          }}
        />
      </CacheProvider>
    </StrictMode>
  )
}
