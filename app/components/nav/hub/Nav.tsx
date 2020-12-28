import Link from "next/link"
import MenuIcon from "mdi-material-ui/Menu"
import AppBar from "@material-ui/core/AppBar"
import Avatar from "@material-ui/core/Avatar"
import Hidden from "@material-ui/core/Hidden"
import Toolbar from "@material-ui/core/Toolbar"
import { useState, Suspense, lazy } from "react"
import Skeleton from "@material-ui/core/Skeleton"
import IconButton from "@material-ui/core/IconButton"

import Desktop from "./Desktop"
import Mobile from "./Mobile"

const ModulesMenu = lazy(() => import("app/components/nav/hub/submenus/ModulesMenu"))
const AvatarMenu = lazy(() => import("app/components/nav/hub/submenus/AvatarMenu"))

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (open) => () => setIsOpen(open)

  return (
    <AppBar className="h-16 justify-center" position="fixed" color="inherit">
        <Toolbar variant="dense">
          <Mobile isOpen={isOpen} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)} />

          <Hidden mdUp>
            <div className="flex flex-grow justify-start">
              <IconButton aria-label="Menu" onClick={toggleDrawer(true)} color="inherit">
                <MenuIcon />
              </IconButton>
            </div>
          </Hidden>

          <Hidden mdDown>
            <div className="h-full w-full flex items-center">
              <Link href="/">
                <Avatar
                  className="m-4 md:mr-4"
                  alt="Logo BDE ISIMA"
                  src="/static/images/logos/logo.svg"
                />
              </Link>

              <Desktop />
            </div>
          </Hidden>

          <div className="flex items-center">
            <Suspense
              fallback={[...Array(2).keys()].map((x) => (
                <Skeleton variant="circular" width={40} height={40} className="mx-2" key={x} />
              ))}
            >
              <ModulesMenu />
              <AvatarMenu />
            </Suspense>
          </div>
        </Toolbar>
      </AppBar>
  )
}
