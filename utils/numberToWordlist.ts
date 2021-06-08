import { Wordlist } from '../models/wordlist';

type LettersMatrix = Array<Array<string>>;

export const mapping = new Map<number, string | Array<string>>([
  [2, ['a', 'b', 'c']],
  [3, ['d', 'e', 'f']],
  [4, ['g', 'h', 'i']],
  [5, ['j', 'k', 'l']],
  [6, ['m', 'n', 'o']],
  [7, ['p', 'q', 'r', 's']],
  [8, ['t', 'u', 'v']],
  [9, ['w', 'x', 'y', 'z']],
]);

/**
 * Function that combines several arrays of strings to create
 *
 * @param  LettersMatrix  Matrix that is iterated over to create a wordlist
 * @returns               A list of possible words
 */
export function combineArrays(lettersMatrix: LettersMatrix): Array<string> {
  return lettersMatrix.reduce(
    (a, b) => a.flatMap((x) => b.map((y) => x + y)),
    [''],
  );
}

/**
 * Validates a number if it can be converted at all
 *
 * @param number Number to convert to it's digits
 * @returns      Whether the number is valid or not
 */
export function validateNumber(number: number): boolean {
  if (
    !number
      .toString()
      .split('')
      .some((num) => parseInt(num, 10) > 1)
  ) {
    return false;
  }

  return true;
}

/**
 * Converts a nubmer into an array of its digits
 *
 * @param number Number to convert to it's digits
 * @returns      An array of digits for a given number
 */
export function convertNumberToDigits(number: number): Array<number> {
  return number.toString().split('').map(Number);
}

/**
 * Function that converts a number to a word list
 *
 * @param number A number to turn into a wordlist
 * @returns A list of words that are possible combinations of a given number
 */
export function convertNumberToWordlist(number: number): Wordlist {
  if (validateNumber(number) === false) {
    return [];
  }

  const digits = convertNumberToDigits(number);

  const lettersMatrix = digits
    .map((digit) => mapping.get(digit))
    .filter(Boolean) as LettersMatrix;

  return combineArrays(lettersMatrix).sort();
}
