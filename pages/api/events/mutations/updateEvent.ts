import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type UpdateEventInput = Pick<Prisma.EventUpdateArgs, "where" | "data">

export default async function updateEvent(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde', ])

  const { where, data }: UpdateEventInput = req.body

  const event = await db.event.update({ where, data })

  res.status(200).json(event)
}
