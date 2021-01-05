import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type GetArticlesInput = Pick<
  Prisma.FindManyArticleArgs,
  "include" | "where" | "orderBy" | "skip" | "take"
>

export default async function getArticles(req: NextApiRequest, res: NextApiResponse) {
  // TODO ctx.session.authorize()

  const { include, where, orderBy, skip = 0, take }: GetArticlesInput = req.body

  const articles = await db.article.findMany({
    include,
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.article.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  res.status(200).json({
    articles,
    nextPage,
    hasMore,
    count,
  })
}
