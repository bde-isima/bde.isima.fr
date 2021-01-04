import { Html, Head, Main, NextScript } from "next/document"

import CustomHead from "app/lib/CustomHead"

export default function Document() {
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
