import { Ctx, resolver } from "blitz"

import db, { Prisma } from "db"

type UpsertArticleInput = Pick<Prisma.ArticleUpsertArgs, "where" | "create" | "update">

export default resolver.pipe(
  resolver.authorize(["*", "bde"]),
  async ({ where, create, update }: UpsertArticleInput, _: Ctx) => {
    return await db.article.upsert({ where, update, create })
  }
)
