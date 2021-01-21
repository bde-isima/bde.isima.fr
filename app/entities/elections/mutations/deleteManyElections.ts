import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteManyElectionInput = Pick<Prisma.ElectionDeleteManyArgs, "where">

export default async function deleteManyElections({ where }: DeleteManyElectionInput, ctx: Ctx) {
  ctx.session.authorize(["*"])

  const voteRequests = await db.voteRequest.deleteMany({
    where: { electionId: { in: (where?.id as Prisma.StringFilter)?.in } },
  })

  const elections = await db.election.deleteMany({ where })

  return {
    elections,
    voteRequests,
  }
}
