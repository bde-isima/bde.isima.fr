import { Ctx } from "blitz"

import db, { Prisma } from "db"

type GetVoteRequestsInput = Pick<
  Prisma.FindManyVoteRequestArgs,
  "where" | "orderBy" | "skip" | "take" | "include"
>

export default async function getVoteRequests(
  { where, orderBy, skip = 0, take, include }: GetVoteRequestsInput,
  ctx: Ctx
) {
  ctx.session.authorize(["*"])

  const voteRequests = await db.voteRequest.findMany({
    include,
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.voteRequest.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    voteRequests,
    nextPage,
    hasMore,
    count,
  }
}
