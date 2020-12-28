import Earth from "mdi-material-ui/Earth"
import Store from "mdi-material-ui/Store"
import Finance from "mdi-material-ui/Finance"
import ClipboardText from "mdi-material-ui/ClipboardText"
import CalendarToday from "mdi-material-ui/CalendarToday"
import AccountDetails from "mdi-material-ui/AccountDetails"
import BookOpenVariant from "mdi-material-ui/BookOpenVariant"
import AccountGroupOutline from "mdi-material-ui/AccountGroupOutline"

import { useCurrentUser } from "app/hooks/useCurrentUser"

const config = [
  {
    icon: <Finance />,
    text: "ANALYTICS",
    to: "/dashboard/analytics",
    role: "bde",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/analytics",
  },
  {
    icon: <ClipboardText />,
    text: "EVENTS",
    to: "/dashboard/events",
    role: "bde",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/events",
  },
  {
    icon: <AccountGroupOutline />,
    text: "CLUBS",
    to: "/dashboard/clubs",
    role: "bde",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/clubs",
  },
  {
    icon: <Store />,
    text: "MARCHÉ",
    to: "/dashboard/articles",
    role: "bde",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/articles",
  },
  {
    icon: <AccountDetails />,
    text: "MEMBRES",
    to: "/dashboard/users",
    role: "bde",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/users",
  },
  {
    icon: <Earth />,
    text: "PARTENAIRES",
    to: "/dashboard/partners",
    role: "bde",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/partners",
  },
  {
    icon: <CalendarToday />,
    text: "PLANNING",
    to: "/dashboard/planning",
    role: "bde",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/planning",
  },
  {
    icon: <BookOpenVariant />,
    text: "PROMOTIONS",
    to: "/dashboard/promotions",
    role: "bde",
    isActive: (pathname: String, hash: String) => pathname === "/dashboard/promotions",
  },
]

export function useBDEConfig() {
  const [user] = useCurrentUser()
  return user?.roles.findIndex((x) => x === "*" || x.toLowerCase() === "bde") !== -1 ? config : []
}

export function getBDEConfigServerSide(user) {
  return user?.roles.findIndex((x) => x === "*" || x.toLowerCase() === "bde") !== -1 ? config : []
}
