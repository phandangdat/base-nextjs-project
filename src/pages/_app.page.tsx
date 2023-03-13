import { Loading } from '@/components/common/Loading';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { theme } from '@/constants';
import { UserProvider } from '@/contexts/userContext';
import Auth from '@/hooks/useAuthPage';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppPropsWithExtendedOptions } from './_app.type';
// Dayjs default configs
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(duration);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppPropsWithExtendedOptions) {
  const Layout = Component.Layout || DefaultLayout;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(false);
    };
    router.events.on('routeChangeStart', (_) => setLoading(true));
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, setLoading]);
  return (
    <>
      {loading ? <Loading /> : <></>}
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {Component.auth ? (
                <Auth auth={Component.auth}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </Auth>
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </LocalizationProvider>
            <ToastContainer newestOnTop theme='colored' />
          </ThemeProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
