import { Form } from '../components/form/form';

import Head from 'next/head';
import { Output } from '../components/output/output';
import { useFetchWordlist } from '../hooks/useFetchWordlist';

import styles from './index.module.css';
import { Keyboard } from '../components/keyboard/keyboard';

/**
 * Application home page route.
 *
 * @returns App home page component.
 */
export default function Home(): JSX.Element {
  const [wordlist, fetchWordlist, isFetching, error] = useFetchWordlist();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.headerHeading}>
            Number to WordList ConverterX T9 3000
          </h1>
        </header>
        <main className={styles.main}>
          <Form fetchWordlist={fetchWordlist} />
        </main>
        <aside className={styles.sidebar}>
          <Output wordlist={wordlist} isFetching={isFetching} error={error} />
        </aside>
        <footer className={styles.footer}>Created by Milos Dzeletovic</footer>
      </div>
    </>
  );
}
