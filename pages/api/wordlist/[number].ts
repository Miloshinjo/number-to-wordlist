// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data: string;
};

function handleGet(req: NextApiRequest, res: NextApiResponse<Data>): void {
  const {
    query: { number },
  } = req;

  console.log(number);

  res.json({ data: 'king' });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
