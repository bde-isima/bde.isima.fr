import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteManyArticleInput = Pick<Prisma.ArticleDeleteManyArgs, "where">

export default async function deleteManyArticles({ where }: DeleteManyArticleInput, ctx: Ctx) {
  ctx.session.authorize(['*', 'bde'])

  const articles = await db.article.deleteMany({ where })

  return articles
}
