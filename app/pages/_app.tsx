import Head from "next/head"
import NProgress from "nprogress"
import { queryCache } from "react-query"
import { StrictMode, Suspense, useEffect } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { AppProps, ErrorComponent, useRouter } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { MuiThemeProvider } from "@material-ui/core"

import "app/styles/index.css"
import * as gtag from "integrations/gtag"
import "react-multi-carousel/lib/styles.css"
import packageJson from "../..//package.json"
import getNav from "app/components/nav/getNav"
import LoginFallback from "app/auth/components/LoginFallback"
import useCustomTheme from "app/styles/useCustomTheme"

globalThis.appName = packageJson.appName
globalThis.website = packageJson.website
globalThis.appVersion = packageJson.version

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const theme = useCustomTheme()
  const getLayout = Component.getLayout || ((page) => page)

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
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          resetKeys={[router.asPath]}
          onReset={() => queryCache.resetErrorBoundaries()}
        >
          <Head>
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
          </Head>

          <Suspense fallback={null}>
            {getNav(router, getLayout(<Component {...pageProps} />))}
          </Suspense>
        </ErrorBoundary>
      </MuiThemeProvider>
    </StrictMode>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error?.name === "AuthenticationError") {
    return <LoginFallback onSuccess={resetErrorBoundary} />
  } else if (error?.name === "AuthorizationError") {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
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
