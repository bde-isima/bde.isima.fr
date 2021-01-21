import Vote from "mdi-material-ui/Vote"
import Earth from "mdi-material-ui/Earth"
import Store from "mdi-material-ui/Store"
import Finance from "mdi-material-ui/Finance"
import ClipboardText from "mdi-material-ui/ClipboardText"
import CalendarToday from "mdi-material-ui/CalendarToday"
import AccountDetails from "mdi-material-ui/AccountDetails"
import BookOpenVariant from "mdi-material-ui/BookOpenVariant"
import AccountGroupOutline from "mdi-material-ui/AccountGroupOutline"

import { useBDESession } from "app/components/auth/SessionProvider"

const config = [
  {
    icon: <ClipboardText />,
    text: "EVENTS",
    to: "/dashboard/events",
    only: ["*", "bde"],
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/events",
  },
  {
    icon: <Finance />,
    text: "STATISTIQUES",
    to: "/dashboard/analytics",
    only: ["*", "bde"],
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/analytics",
  },
  {
    icon: <AccountGroupOutline />,
    text: "CLUBS",
    to: "/dashboard/clubs",
    only: ["*", "bde"],
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/clubs",
  },
  {
    icon: <Store />,
    text: "MARCHÉ",
    to: "/dashboard/articles",
    only: ["*", "bde"],
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/articles",
  },
  {
    icon: <AccountDetails />,
    text: "MEMBRES",
    to: "/dashboard/users",
    only: ["*"],
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/users",
  },
  {
    icon: <Earth />,
    text: "PARTENAIRES",
    to: "/dashboard/partners",
    only: ["*", "bde"],
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/partners",
  },
  {
    icon: <CalendarToday />,
    text: "PLANNING",
    to: "/dashboard/planning",
    only: ["*", "bde"],
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/planning",
  },
  {
    icon: <BookOpenVariant />,
    text: "PROMOTIONS",
    to: "/dashboard/promotions",
    only: ["*", "bde"],
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/promotions",
  },
  {
    icon: <Vote />,
    text: "CAMPAGNES",
    to: "/dashboard/elections",
    only: ["*"],
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/elections",
  },
]

function filter(roles) {
  return config?.filter((c) => {
    return roles?.some((r) => {
      return c.only.some((o) => o.toLowerCase() === r.toLowerCase())
    })
  })
}

export function useBDEConfig() {
  const session = useBDESession()
  return filter(session?.roles)
}

export function getBDEConfigServerSide(user) {
  return filter(user?.roles)
}
