import { Children } from 'react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ServerStyleSheets } from '@material-ui/core/styles'
import createEmotionServer from '@emotion/server/create-instance'
import { Document, Html, DocumentHead, Main, BlitzScript, DocumentContext } from 'blitz'

import CustomHead from 'app/core/lib/CustomHead'

const getCache = () => {
  const cache = createCache({ key: 'css', prepend: true })
  cache.compat = true
  return cache
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <DocumentHead />
        <CustomHead />

        <body className="dark:bg-black">
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  const cache = getCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      enhanceComponent: (Component) => (props) =>
        (
          <CacheProvider value={cache}>
            <Component {...props} />
          </CacheProvider>
        ),
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    styles: [
      ...Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
      ...emotionStyleTags,
    ],
  }
}
