import { items } from './items';

import styles from './keyboard.module.css';

export function Keyboard(): JSX.Element {
  return (
    <div className={styles.container}>
      {items.map(({ number, letters }) => {
        return (
          <button key={number} className={styles.button}>
            <span className={styles.buttonNumber}>{number}</span>
            <span className={styles.buttonLetters}>{letters}</span>
          </button>
        );
      })}
    </div>
  );
}
