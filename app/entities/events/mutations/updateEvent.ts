import { resolver } from 'blitz'

import db, { Prisma } from 'db'

type UpdateEventInput = Pick<Prisma.EventUpdateArgs, 'where' | 'data'>

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where, data }: UpdateEventInput) => {
    return await db.event.update({ where, data })
  }
)
