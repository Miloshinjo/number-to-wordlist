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
 * Generates an url based on the user data
 *
 * @param number              Number that we want wordlist for
 * @param shouldUseDictionary Whether to use dictionary or not
 * @returns                   Fetch wordlist url
 */
function generateWordlistUrl(
  number: number,
  shouldUseDictionary: boolean,
): string {
  const baseUrl = `/api/wordlist/${number}`;

  if (shouldUseDictionary === true) {
    return baseUrl + '?filter=dictionary';
  }

  return baseUrl;
}

/**
 * React hook that fetches the wordlist from the API
 *
 * @returns A tuple of a wordlist and a fetch function for it
 */
export function useFetchWordlist(): [
  WordlistResult['wordlist'] | null,
  (number: number, shouldUseDictionary: boolean) => Promise<void>,
  boolean,
  string,
] {
  const [isFetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [wordlist, setWordlist] =
    useState<WordlistResult['wordlist'] | null>(null);

  /**
   * Fetches the wordlist data from the API
   *
   * @param number               Number parameter to be converted to wordlist
   * @param shouldUseDictionary  Whether to use dictionary to compare words or not
   * @returns                    void
   */
  async function fetchWordlist(
    number: number,
    shouldUseDictionary: boolean,
  ): Promise<void> {
    setFetching(true);
    try {
      const { wordlist } = await fetcher(
        generateWordlistUrl(number, shouldUseDictionary),
      );

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
