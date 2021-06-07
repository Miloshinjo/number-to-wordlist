import styles from './loader.module.css';

export function Loader(): JSX.Element {
  return <div data-testid="loader" className={styles.loader} />;
}
