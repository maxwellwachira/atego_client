import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ColorScheme, MantineProvider } from '@mantine/core';

import '../styles/globals.css';
import PageLoader from '../components/pageLoader/pageLoader';
import { AuthContextProvider } from '../features/authentication/context/authContextProvider';
import { RefreshContextProvider } from '../features/lms/contexts/refreshDataContexProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const colorScheme: ColorScheme = "light";

  useEffect(() => {
    setTimeout(() => setLoading(true), 700);
  }, []);

  return (
    <AuthContextProvider>
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: 'Montserrat, sans-serif'
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <RefreshContextProvider>
          {!loading ?
            (<PageLoader />) :
            (<Component {...pageProps} />)
          }
        </RefreshContextProvider>
      </MantineProvider>
    </AuthContextProvider>
  );

}

export default MyApp;