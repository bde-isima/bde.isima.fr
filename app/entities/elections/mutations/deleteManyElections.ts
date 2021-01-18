import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteManyElectionInput = Pick<Prisma.ElectionDeleteManyArgs, "where">

export default async function deleteManyElections({ where }: DeleteManyElectionInput, ctx: Ctx) {
  ctx.session.authorize(["*"])

  const elections = await db.election.deleteMany({ where })

  return elections
}
