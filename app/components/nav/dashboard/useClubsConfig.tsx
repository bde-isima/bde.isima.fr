import { useQuery } from "react-query"
import { useSession } from "next-auth/client"
import Avatar from "@material-ui/core/Avatar"

import getClubs from "app/entities/clubs/queries/getClubs"

function createConfig(clubs, user) {
  return clubs
    .filter((x) => user?.roles.some((r) => r.toLowerCase() === x.name.toLowerCase() || r === "*"))
    .map((x) => ({
      icon: <Avatar className="w-6 h-6" src={x.image!} alt={`Logo ${x.name}`} />,
      text: x.name.toUpperCase(),
      to: `/dashboard/${x.name.toLowerCase()}`,
      role: x.name,
      isActive: (pathname: String, hash: String) =>
        pathname === `/dashboard/${x.name.toLowerCase()}`,
    }))
}

export function useClubsConfig() {
  const { data } = useQuery("clubs", () => getClubs())
  const [session] = useSession()

  return createConfig(data?.clubs, session)
}

export function getClubsConfigServerSide(clubs, user) {
  return createConfig(clubs, user)
}
