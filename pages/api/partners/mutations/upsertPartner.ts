import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type UpsertPartnerInput = Pick<Prisma.PartnerUpsertArgs, "where" | "create" | "update">

export default async function upsertPartner(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { where, create, update }: UpsertPartnerInput = req.body

  const partner = await db.partner.upsert({ where, update, create })

  res.status(200).json(partner)
}
