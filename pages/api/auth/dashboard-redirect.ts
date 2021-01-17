import { SessionContext } from "blitz"
import { getSessionContext } from "@blitzjs/server"
import { NextApiRequest, NextApiResponse } from "next"

import db from "db"
import { getBDEConfigServerSide } from "app/components/nav/dashboard/useBDEConfig"
import { getClubsConfigServerSide } from "app/components/nav/dashboard/useClubsConfig"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const clubs = await db.club.findMany()
  const session: SessionContext = await getSessionContext(req, res)

  session.authorize()

  const user = await db.user.findUnique({ where: { id: session?.userId! } })

  const bdeConfig = getBDEConfigServerSide(user)
  const clubsConfig = getClubsConfigServerSide(clubs, user)
  const config = bdeConfig.concat(clubsConfig)

  return res.redirect(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}${config.length > 0 ? config[0].to : "/hub"}`
  )
}

export const config = {
  api: {
    bodyParser: false,
  },
}
