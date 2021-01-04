import Head from "next/head"
import NProgress from "nprogress"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { Provider } from "next-auth/client"
import { MuiThemeProvider } from "@material-ui/core"
import { StrictMode, Suspense, useEffect } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { QueryClient, QueryClientProvider } from "react-query"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"

import "app/styles/index.css"
import packageJson from "..//package.json"
import * as gtag from "app/integrations/gtag"
import getNav from "app/components/nav/getNav"
import Splash from "app/components/common/Splash"
import useCustomTheme from "app/styles/useCustomTheme"
import LoginFallback from "app/components/auth/LoginFallback"

globalThis.appName = packageJson.appName
globalThis.website = packageJson.website
globalThis.appVersion = packageJson.version

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { suspense: true },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const theme = useCustomTheme()

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
          //onReset={() => queryCache.resetErrorBoundaries()}
        >
          <QueryClientProvider client={queryClient}>
            <Provider session={pageProps.session}>
              <Head>
                <meta
                  name="viewport"
                  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
              </Head>

              <Suspense fallback={<Splash />}>
                {getNav(router, <Component {...pageProps} />)}
              </Suspense>
            </Provider>
          </QueryClientProvider>
        </ErrorBoundary>
      </MuiThemeProvider>
    </StrictMode>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error?.name === "AuthenticationError") {
    return <LoginFallback onSuccess={resetErrorBoundary} />
  }
  return null
}
