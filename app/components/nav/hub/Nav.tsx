import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import AppBar from "@material-ui/core/AppBar"
import Hidden from "@material-ui/core/Hidden"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"

import Menu from "mdi-material-ui/Menu"

import Mobile from "./Mobile"
import Desktop from "./Desktop"
import AvatarMenu from "app/components/nav/hub/submenus/AvatarMenu"
import ModulesMenu from "app/components/nav/hub/submenus/ModulesMenu"

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
              <Menu />
            </IconButton>
          </div>
        </Hidden>

        <Hidden mdDown>
          <Link href="/" passHref>
            <div className="flex mr-4">
              <Image
                className="rounded-full"
                src="/static/images/logos/logo.svg"
                width={40}
                height={40}
                alt="Logo BDE ISIMA"
              />
            </div>
          </Link>

          <div className="h-full w-full flex items-center">
            <Desktop />
          </div>
        </Hidden>

        <ModulesMenu />
        <AvatarMenu />
      </Toolbar>
    </AppBar>
  )
}
