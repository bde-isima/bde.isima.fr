import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateVoteInput = Pick<Prisma.VoteCreateArgs, "data">
export default async function createVote({ data }: CreateVoteInput, ctx: Ctx) {
  ctx.session.authorize()

  const voteRequest = await db.voteRequest.findUnique({ where: { voteToken: data.voteToken } })

  if (!voteRequest) {
    throw new Error("Token invalide")
  }

  const res = await Promise.all([
    db.voteRequest.delete({ where: { voteToken: data.voteToken } }),
    db.vote.create({ data }),
  ])

  return res[0]
}
