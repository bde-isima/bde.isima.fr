import { Ctx } from "blitz"

import db, { Prisma } from "db"

type UpsertPromotionInput = Pick<Prisma.PromotionUpsertArgs, "where" | "create" | "update">
export default async function upsertPromotion(
  { where, create, update }: UpsertPromotionInput,
  ctx: Ctx
) {
  ctx.session.authorize(["*", "bde"])

  const promotion = await db.promotion.upsert({ where, update, create })

  return promotion
}
