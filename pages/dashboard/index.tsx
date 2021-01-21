import { SessionContext } from "blitz"
import { GetServerSideProps } from "next"
import { getSessionContext } from "@blitzjs/server"

import db from "db"
import { getBDEConfigServerSide } from "app/components/nav/dashboard/useBDEConfig"
import { getClubsConfigServerSide } from "app/components/nav/dashboard/useClubsConfig"

export default function DashboardIndex() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const clubs = await db.club.findMany()
  const session: SessionContext = await getSessionContext(req, res)

  if (!session.isAuthorized()) {
    return {
      redirect: {
        permanent: false,
        destination: "/hub",
      },
    }
  }

  const user = await db.user.findUnique({ where: { id: session?.userId! } })

  const bdeConfig = getBDEConfigServerSide(user)
  const clubsConfig = getClubsConfigServerSide(clubs, user)
  const config = bdeConfig.concat(clubsConfig)

  return {
    redirect: {
      permanent: false,
      destination: config.length > 0 ? config[0].to : "/hub",
    },
  }
}
