import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type UpsertClubInput = Pick<Prisma.ClubUpsertArgs, "where" | "create" | "update">

export default async function upsertClub(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { where, create, update }: UpsertClubInput = req.body

  const club = await db.club.upsert({ where, update, create })

  res.status(200).json(club)
}
