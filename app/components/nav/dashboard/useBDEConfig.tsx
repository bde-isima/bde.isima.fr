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
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/events",
  },
  {
    icon: <Finance />,
    text: "STATISTIQUES",
    to: "/dashboard/analytics",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/analytics",
  },
  {
    icon: <AccountGroupOutline />,
    text: "CLUBS",
    to: "/dashboard/clubs",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/clubs",
  },
  {
    icon: <Store />,
    text: "MARCHÉ",
    to: "/dashboard/articles",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/articles",
  },
  {
    icon: <AccountDetails />,
    text: "MEMBRES",
    to: "/dashboard/users",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/users",
  },
  {
    icon: <Earth />,
    text: "PARTENAIRES",
    to: "/dashboard/partners",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/partners",
  },
  {
    icon: <CalendarToday />,
    text: "PLANNING",
    to: "/dashboard/planning",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/planning",
  },
  {
    icon: <BookOpenVariant />,
    text: "PROMOTIONS",
    to: "/dashboard/promotions",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/promotions",
  },
]

export function useBDEConfig() {
  const session = useBDESession()
  return session?.roles.findIndex((x) => x === "*" || x.toLowerCase() === "bde") !== -1
    ? config
    : []
}

export function getBDEConfigServerSide(user) {
  return user?.roles.findIndex((x) => x === "*" || x.toLowerCase() === "bde") !== -1 ? config : []
}
