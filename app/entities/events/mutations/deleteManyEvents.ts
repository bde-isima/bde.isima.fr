import { resolver } from "@blitzjs/rpc";

import db, { Prisma } from 'db'

type DeleteManyEventInput = Pick<Prisma.EventDeleteManyArgs, 'where'>

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where }: DeleteManyEventInput) => {
    try {
      const events = await db.event.deleteMany({ where })
      return events
    } catch (err) {
      if (err.code === 'P2014') {
        throw new Error('Suppression impossible')
      }
      throw err
    }
  }
)
