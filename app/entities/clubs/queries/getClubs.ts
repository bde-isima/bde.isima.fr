import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetClubsInput = Pick<Prisma.FindManyClubArgs, "where" | "orderBy" | "skip" | "take">

export default async function getClubs(
  { where, orderBy, skip = 0, take }: GetClubsInput,
  ctx: Ctx
) {
  //ctx.session.authorize()

  const clubs = await db.club.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.club.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    clubs,
    nextPage,
    hasMore,
    count,
  }
}
