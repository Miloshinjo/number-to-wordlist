import { items } from './items';

import styles from './keyboard.module.css';

type Props = {
  setInputValue: (value: string) => void;
  backspaceValue: () => void;
};

/**
 * Phone-like interactive keyboard.
 *
 * @param backspaceValue Trims the last character from the value string
 * @param setInputValue  Function that sets input value according to the key pressed
 * @returns              Phone-like keyboard component.
 */
export function Keyboard({
  backspaceValue,
  setInputValue,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      {items.map(({ number, letters }) => {
        return (
          <button
            key={number}
            className={styles.button}
            type="button"
            onClick={() => setInputValue(number)}
          >
            <span className={styles.buttonNumber}>{number}</span>
            <span className={styles.buttonLetters}>{letters}</span>
          </button>
        );
      })}
      <button className={styles.button} type="button" onClick={backspaceValue}>
        &larr;
      </button>
    </div>
  );
}
