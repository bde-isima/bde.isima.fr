import Avatar from '@mui/material/Avatar'
import { useQuery, Image, PublicData, Routes, Router, useAuthenticatedSession, invoke } from 'blitz'

import getClubs from 'app/entities/clubs/queries/getClubs'

function createConfig(clubs, user) {
  return clubs
    .filter((x) => user?.roles.some((r) => r.toLowerCase() === x.name.toLowerCase() || r === '*'))
    .map((x) => ({
      icon: x.image ? (
        <Image src={x.image} width={40} height={40} alt={`Logo ${x.name}`} />
      ) : (
        <Avatar alt={`Logo ${x.name}`} />
      ),
      text: x.name.toUpperCase(),
      to: `/dashboard/${x.name.toLowerCase()}`,
      role: x.name,
      isActive: (pathname: String) => pathname === `/dashboard/${x.name.toLowerCase()}`,
    }))
}

export function useClubsConfig() {
  const session = useAuthenticatedSession()
  const [{ clubs }] = useQuery(getClubs, {})

  return createConfig(clubs, session)
}

export function getClubsConfigServerSide(clubs, user) {
  return createConfig(clubs, user)
}

export const redirectAuthenticatedTo = async ({ session }: { session: PublicData }) => {
  const { clubs } = await invoke(getClubs, {})
  const config = getClubsConfigServerSide(clubs, session)

  const isAuthorized = config.some((c) => c.role === Router.query.name)
  if (isAuthorized) {
    return false
  }
  return Routes.Hub()
}
