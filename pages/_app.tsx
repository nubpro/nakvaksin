import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Nak Naksin!</title>
            </Head>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        </>
    );
}

export default MyApp;
