import Head from 'next/head';
import { ReactNode } from 'react';

import styles from './layout.module.css';

type Props = {
  children: ReactNode;
  title: string;
};

export function Layout({ children, title }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.headerHeading}>
          Number to WordList ConverterX 3000
        </h1>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
