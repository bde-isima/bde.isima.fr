import Document, { Html, Head, Main, NextScript } from "next/document"

import CustomHead from "app/lib/CustomHead"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr" translate="no">
        <Head />
        <CustomHead />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
