import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type DeleteManyUserInput = Pick<Prisma.UserDeleteManyArgs, "where">

export default async function deleteManyUsers(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { where }: DeleteManyUserInput = req.body

  const users = await db.user.deleteMany({ where })

  res.status(200).json(users)
}
