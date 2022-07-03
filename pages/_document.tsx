import Document, { Html, Head as NextHead, Main, NextScript, DocumentContext } from 'next/document';
import { Children } from 'react';
import createEmotionServer from '@emotion/server/create-instance';

import Head from 'app/core/lib/Head';
import { createEmotionCache } from 'app/core/styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head />
        <NextHead />

        <body className="dark:bg-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhancedApp(props) {
          return <App emotionCache={cache} {...props} />;
        }
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  };
};
