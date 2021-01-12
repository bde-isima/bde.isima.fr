import { Ctx, NotFoundError } from "blitz"

import db, { Prisma } from "db"

type FindUniqueAnalyticInput = Pick<Prisma.FindUniqueAnalyticArgs, "where">

export default async function getAnalytic({ where }: FindUniqueAnalyticInput, ctx: Ctx) {
  ctx.session.authorize()

  const analytic = await db.analytic.findFirst({ where })

  if (!analytic) throw new NotFoundError()

  return analytic
}
