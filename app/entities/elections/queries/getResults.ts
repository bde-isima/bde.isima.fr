import { Ctx } from "blitz"

import db, { Prisma } from "db"

type GetResultsInput = Pick<Prisma.FindUniqueElectionArgs, "where">

export default async function getResults({ where }: GetResultsInput, ctx: Ctx) {
  ctx.session.authorize(["*"])

  const election = await db.election.findUnique({ where, include: { candidates: true } })

  if (!election) {
    throw new Error("Campagne introuvable")
  }

  const results = await db.vote.groupBy({
    by: ["candidateId"],
    where: {
      candidateId: {
        in: election.candidates.map((x) => x.id),
      },
    },
  })

  return election.candidates.map((x) => ({
    candidateName: x.name,
    nbVotes: results.filter((y) => y.candidateId === x.id).length,
  }))
}
