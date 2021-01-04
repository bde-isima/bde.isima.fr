import db, { Prisma } from "db"

type DeleteManyPartnerInput = Pick<Prisma.PartnerDeleteManyArgs, "where">

export default async function deleteManyPartners({ where }: DeleteManyPartnerInput) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const partners = await db.partner.deleteMany({ where })

  return partners
}
