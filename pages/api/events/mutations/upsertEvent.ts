import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type UpsertEventInput = Pick<Prisma.EventUpsertArgs, "where" | "create" | "update">

export default async function upsertEvent(req: NextApiRequest, res: NextApiResponse) {
  const { where, create, update }: UpsertEventInput = req.body

  //TODO ctx.session.authorize(['*', 'bde', create.club.connect?.name, update?.club?.connect?.name])

  const event = await db.event.upsert({ where, update, create })

  res.status(200).json(event)
}
