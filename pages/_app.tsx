import "app/styles/index.css"

import Head from "next/head"
import NProgress from "nprogress"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { queryCache } from "react-query"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { MuiThemeProvider } from "@material-ui/core"
import { StrictMode, Suspense, useEffect } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { ErrorComponent, AuthenticationError, AuthorizationError } from "blitz"

import packageJson from "../package.json"
import * as gtag from "app/integrations/gtag"
import getNav from "app/components/nav/getNav"
import Splash from "app/components/common/Splash"
import useCustomTheme from "app/styles/useCustomTheme"
import LoginFallback from "app/components/auth/LoginFallback"
import { SessionProvider } from "app/components/auth/SessionProvider"

globalThis.appName = packageJson.appName
globalThis.website = packageJson.website
globalThis.appVersion = packageJson.version

export const cache = createCache({ key: "css", prepend: true })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const theme = useCustomTheme()

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start()

    const handleRouteChange = (url) => {
      NProgress.done()
      gtag.pageview(url)
    }

    router.events.on("routeChangeStart", handleRouteChangeStart)
    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <StrictMode>
      <CacheProvider value={cache}>
        <Head>
          <title>BDE ISIMA</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
        </Head>

        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            resetKeys={[router.asPath]}
            onReset={() => queryCache.resetErrorBoundaries()}
          >
            <SessionProvider>
              <Suspense fallback={<Splash />}>
                {getNav(router, <Component {...pageProps} />)}
              </Suspense>
            </SessionProvider>
          </ErrorBoundary>
        </MuiThemeProvider>
      </CacheProvider>
    </StrictMode>
  )
}

function RootErrorFallback({ error }: FallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginFallback />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title={error.message ?? "Sorry, you are not authorized to access this"}
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    )
  }
}
