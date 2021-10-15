import { useTheme } from 'app/core/styles/theme'

export default function Head() {
  const theme = useTheme()

  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="robots"
        content={process.env.NEXT_PUBLIC_FRONTEND_URL === globalThis.website ? 'all' : 'none'}
      />
      <meta name="description" content="Site du BDE ISIMA" key="description" />

      <link
        rel="preload"
        href="/fonts/Graphik.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link rel="manifest" href="/manifest.json" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/images/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/images/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/images/favicons/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/static/images/favicons/safari-pinned-tab.svg"
        color={theme.palette.primary.main}
      />

      <meta name="msapplication-TileColor" content={theme.palette.primary.main} />
      <meta name="theme-color" content={theme.palette.primary.main} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={process.env.NEXT_PUBLIC_FRONTEND_URL} key="twitter:url" />
      <meta name="twitter:title" content={globalThis.appName} key="twitter:title" />
      <meta name="twitter:description" content="Site du BDE ISIMA" key="twitter:description" />
      <meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/static/images/favicons/android-chrome-192x192.png`}
        key="twitter:image"
      />
      <meta name="twitter:creator" content="@bde_isima" key="twitter:creator" />

      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:title" content={globalThis.appName} key="og:title" />
      <meta property="og:description" content="Site du BDE ISIMA" key="og:description" />
      <meta property="og:site_name" content={globalThis.appName} key="og:site_name" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_FRONTEND_URL} key="og:url" />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/static/images/favicons/android-chrome-512x512.png`}
        key="og:image"
      />
    </>
  )
}
