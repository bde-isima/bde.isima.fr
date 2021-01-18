import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetElectionsInput = Pick<
  Prisma.FindManyElectionArgs,
  "where" | "orderBy" | "skip" | "take" | "include"
>

export default async function getElections(
  { where, orderBy, skip = 0, take, include }: GetElectionsInput,
  ctx: Ctx
) {
  ctx.session.authorize(["*"])

  const elections = await db.election.findMany({
    where,
    orderBy,
    take,
    skip,
    include,
  })

  const count = await db.election.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    elections,
    nextPage,
    hasMore,
    count,
  }
}
