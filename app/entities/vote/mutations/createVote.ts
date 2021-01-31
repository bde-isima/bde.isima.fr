import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateVoteInput = { data: Prisma.VoteUncheckedCreateInput }
export default async function createVote({ data }: CreateVoteInput, ctx: Ctx) {
  ctx.session.authorize()

  //No null, undefined or empty token
  if (!data.voteToken) {
    throw new Error("Merci de fournir un jeton valide")
  }

  //Request vote by token so we get the real voter (the session can be the one of the proxy voter)
  const realVoterRequest = await db.voteRequest.findUnique({
    where: { voteToken: data.voteToken },
    include: { election: true },
  })

  if (!realVoterRequest) {
    throw new Error("Jeton invalide")
  }

  if (new Date() > realVoterRequest.election.endDate) {
    throw new Error("Les votes sont clos")
  }

  const vote = await db.vote.findUnique({ where: { voteToken: data.voteToken } })

  //Ensure the token hasn't already been used to vote, this condition should never be met as the token is usually reset to null in the vote request after a vote
  //This could usually mean there's a duplicate voteRequest with the same vote token
  if (vote) {
    throw new Error("Jeton déjà utilisé")
  }

  //In the case of a Proxy voter, we increase the proxy vote count by 1 (max 3)
  if (realVoterRequest.userId !== ctx.session.userId) {
    //Retrieve the voteRequest of the proxy voter (supposed to return only one result)
    const proxyVoterRequests = await db.voteRequest.findMany({
      where: { userId: ctx.session.userId, electionId: realVoterRequest.electionId },
      include: { election: true },
      orderBy: { createdAt: "desc" },
    })

    if (proxyVoterRequests.length === 0) {
      throw new Error("Vous n'êtes pas autorisé à voter, même par procuration")
    }

    const proxyVoterRequest = proxyVoterRequests[0]

    //Status of the union state that a user can only proxy vote up to 3 times MAX
    if (proxyVoterRequest.proxyVoteCount >= 3) {
      throw new Error("Vous ne pouvez pas voter par procuration plus de 3 fois")
    }

    //Increase by one the number of proxy vote done by this user
    await db.voteRequest.update({
      data: { proxyVoteCount: { increment: 1 } },
      where: { id: proxyVoterRequest.id },
    })
  }

  //Invalidate the vote request by setting the token to null
  await db.voteRequest.update({ data: { voteToken: null }, where: { id: realVoterRequest.id } })

  //Insert a new vote unlinked from the voter or the proxy voter
  const newVote = await db.vote.create({
    data: { ...data, electionId: realVoterRequest.electionId },
  })

  return newVote
}
