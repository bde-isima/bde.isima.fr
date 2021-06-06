import { resolver } from "blitz"

import db, { Prisma } from "db"

type UpsertPromotionInput = Pick<Prisma.PromotionUpsertArgs, "where" | "create" | "update">

export default resolver.pipe(
  resolver.authorize(["*", "bde"]),
  async ({ where, create, update }: UpsertPromotionInput) => {
    return await db.promotion.upsert({ where, update, create })
  }
)
