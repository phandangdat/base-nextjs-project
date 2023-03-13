/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang='ja'>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='robots' content='noindex, nofollow' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <link rel='stylesheet' href='/css/common.css' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
