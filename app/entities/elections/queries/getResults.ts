import { Ctx } from "blitz"

import db, { Prisma } from "db"

type GetResultsInput = Pick<Prisma.FindUniqueElectionArgs, "where">

export default async function getResults({ where }: GetResultsInput, ctx: Ctx) {
  ctx.session.authorize(["*"])

  const election = await db.election.findUnique({ where, include: { candidates: true } })

  if (!election) {
    throw new Error("Campagne introuvable")
  }

  const results: any = await db.vote.groupBy({
    by: ["candidateId", "isBlank", "isNull"],
    where: { electionId: election.id },
    count: { id: true },
  })

  return results.map((x) => {
    //Group by of a candidate
    if (x.candidateId) {
      return {
        candidateName: election.candidates.find((y) => y.id === x.candidateId)?.name,
        nbVotes: x.count.id,
      }
    }
    //Group by of a blank vote
    else if (x.isBlank) {
      return {
        candidateName: "Votes blancs",
        nbVotes: x.count.id,
      }
    }
    //Group by of a Null vote
    else {
      return {
        candidateName: "Votes nuls",
        nbVotes: x.count.id,
      }
    }
  })
}
