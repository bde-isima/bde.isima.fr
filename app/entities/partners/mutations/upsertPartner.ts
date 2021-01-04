import db, { Prisma } from "db"

type UpsertPartnerInput = Pick<Prisma.PartnerUpsertArgs, "where" | "create" | "update">

export default async function upsertPartner({ where, create, update }: UpsertPartnerInput) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const partner = await db.partner.upsert({ where, update, create })

  return partner
}
