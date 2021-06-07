import {
  combineArrays,
  convertNumberToDigits,
  convertNumberToWordlist,
  validateNumber,
} from '../numberToWordlist';

describe('function: combineArrays', () => {
  test('should combine and sort arrays', () => {
    const array1 = ['a', 'b', 'c'];
    const array2 = ['d', 'e', 'f'];

    const result = combineArrays([array1, array2]).sort();

    expect(result).toEqual([
      'ad',
      'ae',
      'af',
      'bd',
      'be',
      'bf',
      'cd',
      'ce',
      'cf',
    ]);
  });

  test('should return first array when there is only one', () => {
    const array1 = ['a', 'b', 'c'];

    const result = combineArrays([array1]);

    expect(result).toEqual(array1);
  });
});

describe('function: validateNumber', () => {
  test('should return false for non valid number', () => {
    const result = validateNumber(110011);

    expect(result).toBe(false);
  });

  test('should return true for a valid number', () => {
    const result = validateNumber(23);

    expect(result).toBe(true);
  });
});

describe('function: convertNumberToDigits', () => {
  test('should convert number to its digits', () => {
    const result = convertNumberToDigits(23);

    expect(result).toEqual([2, 3]);
  });
});

describe('function: convertNumberToWordlist', () => {
  test('should convert number to wordlist', () => {
    const result = convertNumberToWordlist(23);

    expect(result).toEqual([
      'ad',
      'ae',
      'af',
      'bd',
      'be',
      'bf',
      'cd',
      'ce',
      'cf',
    ]);
  });

  test('should return empty list', () => {
    const result = convertNumberToWordlist(10);

    expect(result).toEqual([]);
  });
});
