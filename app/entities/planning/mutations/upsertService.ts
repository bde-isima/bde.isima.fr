import { Ctx, resolver } from 'blitz'

import db, { Prisma } from 'db'

type UpsertServiceInput = Pick<Prisma.ServiceUpsertArgs, 'where' | 'create' | 'update'>

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where, create, update }: UpsertServiceInput, _: Ctx) => {
    return await db.service.upsert({ where, update, create })
  }
)
