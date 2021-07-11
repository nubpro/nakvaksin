import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';

import SEO from '../components/SEO';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CookiesProvider>
            <Head>
                <SEO />
            </Head>
            <Component {...pageProps} />
        </CookiesProvider>
    );
}

export default MyApp;
