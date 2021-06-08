import type { NextApiRequest, NextApiResponse } from 'next';
import { WordlistResult, WordlistError } from '../../../models/wordlist';
import { convertNumberToWordlist } from '../../../utils/numberToWordlist';

import { dictionary } from '../../../data/englishWords';

const numberLimit = 10;

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Handles GET request to this endpoint (/api/wordlist/:number)
 *
 * @param req Request object
 * @param res Response object
 */
function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<WordlistResult | WordlistError>,
): void {
  const {
    query: { number, filter },
  } = req;

  if (!number) {
    return res.status(400).end({
      error: 'Please provide a number to convert.',
    });
  }

  if (number.toString().length > numberLimit) {
    return res.status(400).json({
      error: `Apologies, but all numbers with over ${numberLimit} digits are not part of this free tier. Please limit your requests to ${numberLimit} letters or lower, or consider becoming a subscriber.`,
    });
  }

  const wordlist = convertNumberToWordlist(Number(number));

  if (filter === 'dictionary') {
    const filteredWordlist = wordlist.filter((value) => dictionary.has(value));

    return res.status(200).json({
      wordlist: filteredWordlist,
    });
  }

  return res.status(200).json({
    wordlist,
  });
}

/**
 * Handler for all request to this endpoint (/api/wordlist/:number)
 *
 * @param req Request object
 * @param res Response object
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WordlistResult | WordlistError>,
): void {
  const { method } = req;

  switch (method) {
    case 'GET':
      handleGet(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
