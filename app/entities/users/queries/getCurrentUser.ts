import { Ctx } from "blitz"

import db from "db"

export default async function getCurrentUser(_ = null, ctx: Ctx) {
  ctx.session.authorize() //Custom addition to ensure all pages that use this query are authorized

  if (!ctx.session.userId) {
    return null
  }

  return db.user.findUnique({ where: { id: ctx.session.userId } })
}
