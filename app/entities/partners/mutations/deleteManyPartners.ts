import { resolver } from 'blitz'

import db, { Prisma } from 'db'

type DeleteManyPartnerInput = Pick<Prisma.PartnerDeleteManyArgs, 'where'>

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where }: DeleteManyPartnerInput) => {
    return await db.partner.deleteMany({ where })
  }
)
