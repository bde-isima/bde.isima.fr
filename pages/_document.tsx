import { Children } from "react"
import { ServerStyleSheets } from "@material-ui/core/styles"
import Document, { Html, Main, NextScript } from "next/document"
import createEmotionServer from "@emotion/server/create-instance"

import { cache } from "./_app"
import CustomHead from "app/lib/CustomHead"

const { extractCritical } = createEmotionServer(cache)

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <CustomHead />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
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
