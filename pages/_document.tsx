import { Children } from "react"
import { ServerStyleSheets } from "@material-ui/core/styles"
import createEmotionServer from "@emotion/server/create-instance"
import { Document, Html, DocumentHead, Main, BlitzScript, DocumentContext } from "blitz"

import { cache } from "./_app"
import CustomHead from "app/lib/CustomHead"

const { extractCritical } = createEmotionServer(cache)

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

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)
  const styles = extractCritical(initialProps.html)

  return {
    ...initialProps,
    styles: [
      ...Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
      <style
        key="emotion-style-tag"
        data-emotion={`css ${styles.ids.join(" ")}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: styles.css }}
      />,
    ],
  }
}
