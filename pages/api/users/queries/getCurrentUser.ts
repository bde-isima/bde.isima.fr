import { getSession } from "next-auth/client"
import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type GetCurrentUserInput = Pick<Prisma.FindUniqueUserArgs, "include">

export default async function getCurrentUser(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession()
  //TODO ctx.session.authorize()

  const { include }: GetCurrentUserInput = req.body

  res.status(200).json({
    where: { id: session?.user?.id },
    include,
  })
}
