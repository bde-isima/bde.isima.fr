import { Ctx } from "blitz"

import db, { Prisma } from "db"

type DeleteManyPromotionInput = Pick<Prisma.PromotionDeleteManyArgs, "where">

export default async function deleteManyPromotions({ where }: DeleteManyPromotionInput, ctx: Ctx) {
  ctx.session.authorize(["*", "bde"])

  const promotions = await db.promotion.deleteMany({ where })

  return promotions
}
