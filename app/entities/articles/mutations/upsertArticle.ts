import { Ctx } from "blitz"

import db, { Prisma } from "db"
import { assertPositive, assertIsNumber } from "utils/assert"

type UpsertArticleInput = Pick<Prisma.ArticleUpsertArgs, "where" | "create" | "update">
export default async function upsertArticle(
  { where, create, update }: UpsertArticleInput,
  ctx: Ctx
) {
  ctx.session.authorize(['*', 'bde'])

  assertIsNumber("price", create.price)
  assertIsNumber("price", update.price)

  assertIsNumber("member_price", create.member_price)
  assertIsNumber("member_price", update.member_price)

  assertPositive("price", create.price)
  assertPositive("price", update.price)

  assertPositive("member_price", create.member_price)
  assertPositive("member_price", update.member_price)

  const article = await db.article.upsert({ where, update, create })

  return article
}
