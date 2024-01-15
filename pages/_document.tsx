import * as React from 'react';
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import { DocumentHeadTags, documentGetInitialProps } from '@mui/material-nextjs/v14-pagesRouter';
import theme, { notoSansKr } from '../src/theme';

// TODO: 타입 오류 해결용 임시 추가
interface EmotionDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[]
}

export default function MyDocument(props: EmotionDocumentProps) {

  return (
    <Html lang="ko" className={notoSansKr.className}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = documentGetInitialProps;
