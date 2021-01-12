import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteManyPartnerInput = Pick<Prisma.PartnerDeleteManyArgs, "where">

export default async function deleteManyPartners({ where }: DeleteManyPartnerInput, ctx: Ctx) {
  ctx.session.authorize(["*", "bde"])

  const partners = await db.partner.deleteMany({ where })

  return partners
}
