// Handles the webhook received from the Lyf payout platform to validate a topup
// operation and then increase the balance
import db from 'db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const { body, query } = req;
    throw new Error('Unimplemented');
  } else throw new Error(`Unhandled method ${req.method}`);
}
