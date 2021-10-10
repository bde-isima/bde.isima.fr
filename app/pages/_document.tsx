import { Children } from 'react'
import createEmotionServer from '@emotion/server/create-instance'
import { BlitzScript, Document, DocumentContext, DocumentHead, Html, Main } from 'blitz'

import Head from 'app/core/lib/Head'
import createEmotionCache from 'app/core/lib/createEmotionCache'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <DocumentHead />
        <Head />

        <body className="dark:bg-black">
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
  }
}
