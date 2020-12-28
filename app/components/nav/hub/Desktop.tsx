import { useMemo } from "react"

import ViewDashboardOutline from "mdi-material-ui/ViewDashboardOutline"

import config from "./config"
import DesktopMenuItem from "app/components/nav/hub/DesktopMenuItem"
import { useBDEConfig } from "app/components/nav/dashboard/useBDEConfig"
import { useClubsConfig } from "app/components/nav/dashboard/useClubsConfig"

export default function Desktop() {
  const bdeConfig = useBDEConfig()
  const clubsConfig = useClubsConfig()

  return useMemo(
    () => (
      <>
        {config.map((item) => (
          <DesktopMenuItem key={item.to} item={item} />
        ))}

        {(bdeConfig.length > 0 || clubsConfig.length > 0) && (
          <DesktopMenuItem
            item={{
              icon: <ViewDashboardOutline />,
              text: "DASHBOARD",
              to: "/dashboard",
              isActive: (pathname: String, hash: String) => pathname === "/dashboard",
            }}
          />
        )}
      </>
    ),
    [bdeConfig.length, clubsConfig.length]
  )
}
