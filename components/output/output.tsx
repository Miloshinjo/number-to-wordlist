import { Wordlist } from '../../models/wordlist';

import styles from './output.module.css';

type Props = {
  isFetching: boolean;
  error: string;
  wordlist: Wordlist;
};

/**
 * Output component for the list of words
 *
 * @param   isFetching Whether the list is fetching
 * @param   error      Whether an error occured
 * @param   wordlist   An array of words converted from a number
 * @returns            An output component that contians a wordlist
 */
export function Output({ isFetching, error, wordlist }: Props): JSX.Element {
  if (error !== '') {
    return <div>{error}</div>;
  }

  if (isFetching === true) {
    return <div>Loading..</div>;
  }

  if (wordlist.length === 0) {
    <div>No result</div>;
  }

  return (
    <div>
      <h2>Number of words: {wordlist.length}</h2>
      <ul className={styles.list}>
        {wordlist.map((word) => {
          return (
            <li className={styles.word} key={word}>
              {word}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
