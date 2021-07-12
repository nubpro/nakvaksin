import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CookiesProvider>
            <Head>
                <title>Nak Naksin!</title>
            </Head>
            <Component {...pageProps} />
        </CookiesProvider>
    );
}

export default MyApp;
