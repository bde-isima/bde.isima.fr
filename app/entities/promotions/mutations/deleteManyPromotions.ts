import { resolver } from "@blitzjs/rpc";

import db, { Prisma } from 'db'

type DeleteManyPromotionInput = Pick<Prisma.PromotionDeleteManyArgs, 'where'>

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where }: DeleteManyPromotionInput) => {
    return await db.promotion.deleteMany({ where })
  }
)
