import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(404).send('EXPECTED TOPUP TOKEN')
}
