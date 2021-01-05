import { getSession } from "next-auth/client"
import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type UpdateUserInput = {
  data: Pick<Prisma.UserUpdateInput, "id" | "nickname" | "email">
  where: Prisma.UserWhereUniqueInput
}

export default async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize()

  const session = await getSession()

  const { where, data }: UpdateUserInput = req.body

  if (session?.user?.id !== data?.id) {
    return res.status(403).json({ message: "Non autorisé" })
  }

  const user = await db.user.update({ where, data })

  res.status(200).json(user)
}
