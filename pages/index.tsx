import { Form } from '../components/form/form';
import { Keyboard } from '../components/keyboard/keyboard';

import { Layout } from '../components/layout/layout';
import { Output } from '../components/output/output';
import { useFetchWordlist } from '../hooks/useFetchWordlist';

import styles from './index.module.css';

/**
 * Application home page route.
 *
 * @returns App home page component.
 */
export default function Home(): JSX.Element {
  const [wordlist, fetchWordlist, isFetching, error] = useFetchWordlist();

  return (
    <Layout title="Home">
      <div className={styles.container}>
        <div className="flex p-6 rounded">
          <Keyboard />
        </div>

        <Form fetchWordlist={fetchWordlist} />

        <div className="h-full w-full border-l">
          <Output wordlist={wordlist} isFetching={isFetching} error={error} />
        </div>
      </div>
    </Layout>
  );
}
