import db, { Prisma } from "db"
import { assertIsNumber } from "app/utils/assert"

type UpsertPromotionInput = Pick<Prisma.PromotionUpsertArgs, "where" | "create" | "update">
export default async function upsertPromotion({ where, create, update }: UpsertPromotionInput) {
  //TODO ctx.session.authorize(['*', 'bde'])

  assertIsNumber("year", create.year)
  assertIsNumber("year", update.year)

  assertIsNumber("fb_group_id", create.fb_group_id)
  assertIsNumber("fb_group_id", update.fb_group_id)

  const promotion = await db.promotion.upsert({ where, update, create })

  return promotion
}
