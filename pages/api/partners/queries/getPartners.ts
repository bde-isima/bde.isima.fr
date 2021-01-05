import db, { Prisma } from "db"
import { NextApiRequest, NextApiResponse } from "next"

type GetPartnersInput = Pick<Prisma.FindManyPartnerArgs, "where" | "orderBy" | "skip" | "take">

export default async function getPartners(req: NextApiRequest, res: NextApiResponse) {
  const { where, orderBy, skip = 0, take }: GetPartnersInput = req.body

  const partners = await db.partner.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.partner.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  res.status(200).json({
    partners,
    nextPage,
    hasMore,
    count,
  })
}
