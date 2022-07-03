import { resolver } from "@blitzjs/rpc";

import db, { Prisma } from 'db'

type FindUniqueAnalyticInput = Pick<Prisma.AnalyticFindUniqueArgs, 'where'>

export default resolver.pipe(resolver.authorize(), async ({ where }: FindUniqueAnalyticInput) => {
  return await db.analytic.findFirst({ where, rejectOnNotFound: true })
})
