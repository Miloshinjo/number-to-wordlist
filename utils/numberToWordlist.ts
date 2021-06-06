type LettersMatrix = Array<Array<string>>;

const mapping = new Map<number, string | Array<string>>([
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
function combineArrays([
  head,
  ...[headTail, ...tail]
]: LettersMatrix): Array<string> {
  if (!headTail) {
    return head;
  }

  const combined = headTail.reduce((total, current) => {
    return total.concat(head.map((h: string) => `${h}${current}`));
  }, [] as string[]);

  return combineArrays([combined, ...tail]);
}

/**
 * Converts a nubmer into an array of its digits
 *
 * @param number Number to convert to it's digits
 * @returns      An array of digits for a given number
 */
function convertNumberToDigits(number: number): Array<number> {
  return number.toString().split('').map(Number);
}

/**
 * Function that converts a number to a word list
 *
 * @param number A number to turn into a wordlist
 * @returns A list of words that are possible combinations of a given number
 */
export function numberToWordlist(number: number): Array<string> {
  if (number < 0) return [];

  const digits = convertNumberToDigits(number);

  const lettersMatrix = digits
    .map((digit) => mapping.get(digit))
    .filter(Boolean) as LettersMatrix;

  return combineArrays(lettersMatrix);
}
