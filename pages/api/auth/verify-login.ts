import { getSessionContext } from "@blitzjs/server"
import { NextApiRequest, NextApiResponse } from "next"

import db from "db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req

  const request = await db.loginRequest.findUnique({
    where: { token: `${query.token}` },
    include: { user: true },
  })

  if (!request || new Date() > request.expires) {
    return res.redirect("/login?invalid=1")
  }

  const session = await getSessionContext(req, res)

  await Promise.all([
    session.create({
      userId: request.user.id,
      roles: request.user.roles,
      firstname: request.user.firstname,
      lastname: request.user.lastname,
      nickname: request.user.nickname,
      image: request.user.image,
      email: request.user.email,
      card: request.user.card,
    }),
    db.loginRequest.delete({ where: { id: request.id } }),
  ])

  return res.redirect(request.callbackUrl)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
