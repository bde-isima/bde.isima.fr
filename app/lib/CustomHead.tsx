import { Head } from "next/document"
import useCustomTheme from "app/styles/useCustomTheme"

export default function CustomHead() {
  const theme = useCustomTheme()

  return (
    <Head>
      <meta charSet="utf-8" />

      <meta name="description" content="Site du BDE ISIMA" key="description" />

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
      <link rel="manifest" href="/manifest.json" />

      <meta name="msapplication-TileColor" content={theme.palette.primary.main} />
      <meta name="theme-color" content={theme.palette.primary.main} />

      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat" />
      <link href="/static/nprogress.css" rel="stylesheet" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={process.env.NEXT_PUBLIC_FRONTEND_URL} />
      <meta name="twitter:title" content={globalThis.appName} />
      <meta name="twitter:description" content="Site du BDE ISIMA" />
      <meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/static/images/favicons/android-chrome-192x192.png`}
      />
      <meta name="twitter:creator" content="@bde_isima" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={globalThis.appName} />
      <meta property="og:description" content="Site du BDE ISIMA" />
      <meta property="og:site_name" content={globalThis.appName} />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_FRONTEND_URL} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/static/images/favicons/android-chrome-512x512.png`}
      />

      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <script
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
    </Head>
  )
}
