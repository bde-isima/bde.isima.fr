import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type DeleteManyArticleInput = Pick<Prisma.ArticleDeleteManyArgs, "where">

export default async function deleteManyArticles(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { where }: DeleteManyArticleInput = req.body

  const articles = await db.article.deleteMany({ where })

  res.status(200).json(articles)
}
