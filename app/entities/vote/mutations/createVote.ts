import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateVoteInput = { data: Prisma.VoteUncheckedCreateInput }
export default async function createVote({ data }: CreateVoteInput, ctx: Ctx) {
  ctx.session.authorize()

  const voteRequest = await db.voteRequest.findUnique({
    where: { voteToken: data.voteToken },
    include: { election: true },
  })

  if (!voteRequest) {
    throw new Error("Token invalide")
  }

  if (new Date() > voteRequest.election.endDate) {
    throw new Error("Les votes sont clos")
  }

  const vote = await db.vote.findUnique({
    where: { voteToken: data.voteToken },
  })

  if (vote) {
    throw new Error("Jeton déjà utilisé")
  }

  await db.vote.create({ data: { ...data, electionId: voteRequest.electionId } })

  const res = await db.voteRequest.delete({ where: { voteToken: data.voteToken } })

  return res
}
