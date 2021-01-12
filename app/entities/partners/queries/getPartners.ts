import { Ctx } from "blitz"

import db, { Prisma } from "db"

type GetPartnersInput = Pick<Prisma.FindManyPartnerArgs, "where" | "orderBy" | "skip" | "take">

export default async function getPartners(
  { where, orderBy, skip = 0, take }: GetPartnersInput,
  ctx: Ctx
) {
  //ctx.session.authorize()

  const partners = await db.partner.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.partner.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    partners,
    nextPage,
    hasMore,
    count,
  }
}
