import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type DeleteManyPromotionInput = Pick<Prisma.PromotionDeleteManyArgs, "where">

export default async function deleteManyPromotions(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { where }: DeleteManyPromotionInput = req.body

  const promotions = await db.promotion.deleteMany({ where })

  res.status(200).json(promotions)
}
