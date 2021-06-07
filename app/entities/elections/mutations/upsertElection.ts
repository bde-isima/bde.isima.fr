import cuid from 'cuid'
import { resolver } from 'blitz'

import db, { Prisma } from 'db'

type UpsertElectionInput = Pick<Prisma.ElectionUpsertArgs, 'where' | 'create' | 'update'>

export default resolver.pipe(
  resolver.authorize(['*']),
  async ({ where, create, update }: UpsertElectionInput) => {
    const [election, eligibleVoters] = await Promise.all([
      db.election.upsert({
        where,
        update: {
          ...update,
          candidates: {
            set: [],
            ...update.candidates,
            update: (update.candidates?.connectOrCreate as any[])?.map((x) => ({
              data: x.create,
              where: x.where,
            })),
          },
        },
        create,
      }),
      db.user.findMany({ where: { promotion: { isNot: null }, is_member: true } }),
    ])

    const voteRequests = await Promise.all(
      eligibleVoters.map((v) => {
        return db.voteRequest.create({
          data: {
            userId: v.id,
            electionId: election.id,
            voteToken: cuid(),
          },
        })
      })
    )

    return {
      election,
      voteRequests,
    }
  }
)
