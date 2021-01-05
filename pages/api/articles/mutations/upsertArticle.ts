import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"
import { ArticleInput } from "app/components/forms/validations"

type UpsertArticleInput = Pick<Prisma.ArticleUpsertArgs, "where" | "create" | "update">

export default async function upsertArticle(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { where, create, update }: UpsertArticleInput = req.body

  try {
    ArticleInput.parse(create)
    ArticleInput.parse(update)

    const article = await db.article.upsert({ where, update, create })

    res.status(200).json(article)
  } catch (err) {
    res.status(403).json(err.message)
  }
}
