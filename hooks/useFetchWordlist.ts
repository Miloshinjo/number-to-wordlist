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
  (number: number) => Promise<void>
] {
  const [wordlist, setWordlist] = useState<WordlistResult['wordlist']>([]);

  async function fetchWordlist(number: number): Promise<void> {
    const { wordlist } = await fetcher(`/api/wordlist/${number}`);

    setWordlist(wordlist);
  }

  return [wordlist, fetchWordlist];
}
