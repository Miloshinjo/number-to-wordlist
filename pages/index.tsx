import { Form } from '../components/form/form';

import { Layout } from '../components/layout/layout';
import { useFetchWordlist } from '../hooks/useFetchWordlist';

/**
 * Application home page route.
 *
 * @returns App home page component.
 */
export default function Home(): JSX.Element {
  const [wordlist, fetchWordlist] = useFetchWordlist();

  return (
    <Layout title="Home">
      <div className="grid grid-cols-2 gap-6 bg-green-100 p-6 rounded">
        <Form fetchWordlist={fetchWordlist} />

        {wordlist}
      </div>
    </Layout>
  );
}
