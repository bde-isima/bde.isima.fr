import Avatar from "@material-ui/core/Avatar"

import { useClubs } from "app/hooks/useClubs"
import { useCurrentUser } from "app/hooks/useCurrentUser"

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
  const { clubs } = useClubs()
  const [user] = useCurrentUser()

  return createConfig(clubs, user)
}

export function getClubsConfigServerSide(clubs, user) {
  return createConfig(clubs, user)
}
