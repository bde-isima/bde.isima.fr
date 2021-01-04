import db, { Prisma } from "db"

type GetUsersInput = Pick<
  Prisma.FindManyUserArgs,
  "where" | "orderBy" | "skip" | "take" | "include"
>

export default async function getUsersPublicData({
  where,
  orderBy,
  skip = 0,
  take,
  include,
}: GetUsersInput) {
  //TODO ctx.session.authorize()

  const users = await db.user.findMany({
    include,
    where,
    orderBy,
    take,
    skip,
    select: {
      id: true,
      firstname: true,
      lastname: true,
      nickname: true,
      card: true,
    },
  })

  const count = await db.user.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    users,
    nextPage,
    hasMore,
    count,
  }
}
