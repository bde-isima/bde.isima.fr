import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type FindUniqueUserInput = Pick<Prisma.FindUniqueUserArgs, "where">

export default async function getUserAvatar(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize()

  const { where }: FindUniqueUserInput = req.body

  const user = await db.user.findFirst({
    where,
    select: { image: true },
  })

  if (!user) throw new Error("Introuvable")

  res.status(200).json(user)
}
