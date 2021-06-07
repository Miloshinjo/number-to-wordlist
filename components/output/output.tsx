import { Wordlist } from '../../models/wordlist';
import { Loader } from '../loader/loader';
import Image from 'next/image';

import styles from './output.module.css';

type Props = {
  isFetching: boolean;
  error: string;
  wordlist: Wordlist | null;
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
    return <div className={styles.container}>{error}</div>;
  }

  if (wordlist === null) {
    return <div className={styles.container}>Generate your wordlist</div>;
  }

  if (isFetching === true) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (wordlist.length === 0) {
    return (
      <div className={styles.container}>
        <h4 className={styles.infoHeading}>
          No words were found for your number
        </h4>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.heading}>
        Number of words:{' '}
        <span className={styles.headingNumber}>{wordlist.length}</span>
      </h2>
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
