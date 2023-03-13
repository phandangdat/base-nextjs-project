import { AppProps } from 'next/app';

export type NextPageWithExtendedOptions = {
  Layout: any;
  auth: boolean;
};

export type AppPropsWithExtendedOptions = AppProps & {
  Component: NextPageWithExtendedOptions;
};
