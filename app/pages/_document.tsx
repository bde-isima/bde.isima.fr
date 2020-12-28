import { Document, Html, DocumentHead, Main, BlitzScript } from "blitz"

import CustomHead from "app/lib/CustomHead"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr" translate="no">
        <DocumentHead />
        <CustomHead />
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}
