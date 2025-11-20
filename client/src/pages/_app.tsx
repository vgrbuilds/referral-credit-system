import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { validateEnv } from '../utils/validateEnv';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        validateEnv();
    }, []);

    return <Component {...pageProps} />;
}
