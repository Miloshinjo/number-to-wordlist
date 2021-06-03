import Head from 'next/head';
import { Keyboard } from '../components/keyboard/keyboard';
import { Layout } from '../components/layout/layout';

function Home() {
  return (
    <Layout title="Home">
      <Keyboard />
    </Layout>
  );
}

export { Home as default };
