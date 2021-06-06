import { resolver } from "blitz"

import db, { Prisma } from "db"

type GetArticlesInput = Pick<
  Prisma.ArticleFindManyArgs,
  "include" | "where" | "orderBy" | "skip" | "take"
>

export default resolver.pipe(
  resolver.authorize(),
  async ({ include, where, orderBy, skip = 0, take }: GetArticlesInput) => {
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

    return {
      articles,
      nextPage,
      hasMore,
      count,
    }
  }
)
