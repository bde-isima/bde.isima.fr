import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type DeleteManyPartnerInput = Pick<Prisma.PartnerDeleteManyArgs, "where">

export default async function deleteManyPartners(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { where }: DeleteManyPartnerInput = req.body

  const partners = await db.partner.deleteMany({ where })

  res.status(200).json(partners)
}
