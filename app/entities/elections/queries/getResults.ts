import { resolver } from "@blitzjs/rpc";

import db, { Prisma } from 'db'

type GetResultsInput = Pick<Prisma.ElectionFindUniqueArgs, 'where'>

export default resolver.pipe(resolver.authorize(['*']), async ({ where }: GetResultsInput) => {
  const election = await db.election.findUnique({
    where,
    include: { candidates: true },
    rejectOnNotFound: true
  })

  const results: any = await db.vote.groupBy({
    by: ['candidateId', 'isBlank', 'isNull'],
    where: { electionId: election.id },
    _count: { id: true }
  })

  return results.map((x) => {
    //Group by of a candidate
    if (x.candidateId) {
      return {
        candidateName: election.candidates.find((y) => y.id === x.candidateId)?.name,
        nbVotes: x.count.id
      }
    }
    //Group by of a blank vote
    else if (x.isBlank) {
      return {
        candidateName: 'Votes blancs',
        nbVotes: x.count.id
      }
    }
    //Group by of a Null vote
    else {
      return {
        candidateName: 'Votes nuls',
        nbVotes: x.count.id
      }
    }
  })
})
