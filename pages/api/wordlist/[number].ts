import type { NextApiRequest, NextApiResponse } from 'next';
import { WordlistResult } from '../../../models/wordlist';
import { numberToWordlist } from '../../../utils/numberToWordlist';

import { dictionary } from '../../../data/englishWords';

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
  res: NextApiResponse<WordlistResult>
): void {
  const {
    query: { number },
  } = req;

  if (!number) {
    res.status(404).end('Please provide a number to convert');
  }

  const wordlist = numberToWordlist(Number(number));

  // const filteredWordlist = wordlist.filter((value) =>
  //   dictionary.includes(value)
  // );

  res.status(200).json({
    wordlist: wordlist,
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
  res: NextApiResponse<WordlistResult>
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
