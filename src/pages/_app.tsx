import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TopLoader from '@/components/TopLoader';
import { ThemeProvider } from '@/contexts/ThemeContext';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <ThemeProvider>
      <div className={roboto.className}>
        <TopLoader loading={loading} />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
