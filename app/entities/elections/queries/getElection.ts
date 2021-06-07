import { resolver } from 'blitz'

import db, { Prisma } from 'db'

type FindFirstElectionInput = Pick<Prisma.ElectionFindFirstArgs, 'where' | 'include'>

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, include }: FindFirstElectionInput) => {
    return await db.election.findFirst({ where, include })
  }
)
