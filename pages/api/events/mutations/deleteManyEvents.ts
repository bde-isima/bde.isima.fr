import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type DeleteManyEventInput = Pick<Prisma.EventDeleteManyArgs, "where">

export default async function deleteManyEvents(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { where }: DeleteManyEventInput = req.body

  const events = await db.event.deleteMany({ where })

  res.status(200).json(events)
}
