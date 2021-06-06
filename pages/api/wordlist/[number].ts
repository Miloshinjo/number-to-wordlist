import type { NextApiRequest, NextApiResponse } from 'next';
import { WordlistResult } from '../../../models/wordlist';
import { numberToWordlist } from '../../../utils/numberToWordlist';

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

  const wordlist = numberToWordlist(Number(number));

  res.json({
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
