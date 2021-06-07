import { useState } from 'react';
import { WordlistResult } from '../models/wordlist';

/**
 * Fetch function abstraction to lower the steps of use
 *
 * @param url Endpoint route
 * @returns   Fetch function
 */
function fetcher(url: string): Promise<WordlistResult> {
  return fetch(url).then((res) => res.json());
}

/**
 * React hook that fetches the wordlist from the API
 *
 * @returns A tuple of a wordlist and a fetch function for it
 */
export function useFetchWordlist(): [
  WordlistResult['wordlist'],
  (number: number) => Promise<void>,
  boolean,
  string
] {
  const [isFetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [wordlist, setWordlist] = useState<WordlistResult['wordlist']>([]);

  async function fetchWordlist(number: number): Promise<void> {
    setFetching(true);
    try {
      const { wordlist } = await fetcher(`/api/wordlist/${number}`);

      setError('');
      setWordlist(wordlist);
    } catch (error) {
      console.error(error);
      setError('An error occured.');
    } finally {
      setFetching(false);
    }
  }

  return [wordlist, fetchWordlist, isFetching, error];
}
