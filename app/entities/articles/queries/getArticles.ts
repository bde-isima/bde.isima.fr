import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetArticlesInput = Pick<
  Prisma.FindManyArticleArgs,
  "select" | "include" | "where" | "orderBy" | "skip" | "take"
>

export default async function getArticles(
  { include, where, orderBy, skip = 0, take }: GetArticlesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

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
