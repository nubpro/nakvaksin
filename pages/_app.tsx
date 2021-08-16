import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';

import SEO from '../components/SEO';

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Head>
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=G-9BJ58SKGY6`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9BJ58SKGY6', {
              page_path: window.location.pathname,
            });
          `
                        }}
                    />
                    <title>NakVaksin</title>
                    <SEO />
                </Head>
                <Toaster />
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
