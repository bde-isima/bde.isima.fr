import { Ctx } from "blitz"

import db, { Prisma } from "db"

type UpsertArticleInput = Pick<Prisma.ArticleUpsertArgs, "where" | "create" | "update">
export default async function upsertArticle(
  { where, create, update }: UpsertArticleInput,
  ctx: Ctx
) {
  ctx.session.authorize(["*", "bde"])

  const article = await db.article.upsert({ where, update, create })

  return article
}
