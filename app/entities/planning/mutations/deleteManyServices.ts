import { resolver } from 'blitz'

import db, { Prisma } from 'db'

type DeleteManyServiceInput = Pick<Prisma.ServiceDeleteManyArgs, 'where'>

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where }: DeleteManyServiceInput) => {
    return await db.service.deleteMany({ where })
  }
)
