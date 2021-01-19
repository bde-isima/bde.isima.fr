import { Ctx, NotFoundError } from "blitz"

import db, { Prisma } from "db"

type FindFirstElectionInput = Pick<Prisma.FindFirstElectionArgs, "where" | "include">

export default async function getElection({ where, include }: FindFirstElectionInput, ctx: Ctx) {
  ctx.session.authorize()

  const election = await db.election.findFirst({ where, include })

  if (!election) throw new NotFoundError()

  return election
}
