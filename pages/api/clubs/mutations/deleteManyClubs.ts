import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type DeleteManyClubInput = Pick<Prisma.ClubDeleteManyArgs, "where">

export default async function deleteManyClubs(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { where }: DeleteManyClubInput = req.body

  const clubs = await db.club.deleteMany({ where })

  res.status(200).json(clubs)
}
