import Document, { Html, Head as NextHead, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'

import Head from 'app/core/lib/Head'
import { getInitColorSchemeScript } from '@mui/material/styles'
import { createEmotionCache } from 'app/core/styles/theme'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        {/* <NextHead>
          <meta name="emotion-insertion-point" content="" />
          {(this.props as any).emotionStyleTags}
        </NextHead> */}
        <Head />
        <NextHead />

        <body className="dark:bg-black">
          {/* {getInitColorSchemeScript()} */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// MyDocument.getInitialProps = async (ctx) => {
//   const originalRenderPage = ctx.renderPage

//   // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
//   // However, be aware that it can have global side effects.
//   const cache = createEmotionCache()
//   const { extractCriticalToChunks } = createEmotionServer(cache)

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App: any) =>
//         function EnhanceApp(props) {
//           return <App emotionCache={cache} {...props} />
//         }
//     })

//   const initialProps = await Document.getInitialProps(ctx)
//   // This is important. It prevents Emotion to render invalid HTML.
//   // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
//   const emotionStyles = extractCriticalToChunks(initialProps.html)
//   const emotionStyleTags = emotionStyles.styles.map((style) => (
//     <style
//       data-emotion={`${style.key} ${style.ids.join(' ')}`}
//       key={style.key}
//       // eslint-disable-next-line react/no-danger
//       dangerouslySetInnerHTML={{ __html: style.css }}
//     />
//   ))

//   return {
//     ...initialProps,
//     emotionStyleTags
//   }
// }
