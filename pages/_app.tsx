import '../styles/globals.css';
import type { AppProps } from 'next/app';

/**
 * Main application entry point component.
 *
 * @param Component Nextjs component.
 * @param pageProps Props for all of our routes/pages.
 * @returns         Main nextjs _app component.
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
export default MyApp;
