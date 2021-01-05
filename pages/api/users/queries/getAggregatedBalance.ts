import { NextApiRequest, NextApiResponse } from "next"

import db from "db"

export default async function getAggregatedBalance(_: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(["*", "bde"])

  const [negatives, positives] = await Promise.all([
    await db.user.count({
      where: { balance: { lt: 0 } },
    }),
    await db.user.count({
      where: { balance: { gt: 0 } },
    }),
  ])

  res.status(200).json({
    negatives,
    positives,
  })
}
