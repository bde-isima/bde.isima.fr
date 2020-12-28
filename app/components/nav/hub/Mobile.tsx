import Link from "next/link"
import { useMemo } from "react"
import List from "@material-ui/core/List"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"

import HomeOutline from "mdi-material-ui/HomeOutline"

import config from "./config"
import DashboardMobile from "app/components/nav/dashboard/Mobile"
import MobileMenuItem from "app/components/nav/hub/MobileMenuItem"

export default function Mobile({ isOpen, onOpen, onClose }) {
  const iOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const ItemsList = useMemo(
    () => (
      <>
        {config.map((item) => (
          <MobileMenuItem key={item.to} item={item} onClose={onClose} />
        ))}
      </>
    ),
    [onClose]
  )

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      PaperProps={{ className: "w-3/4" }}
    >
      <div className="text-center">
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar
                className="m-2 mr-4"
                src="/static/images/logos/logo.svg"
                alt="Logo BDE ISIMA"
              />
            </ListItemIcon>

            <ListItemText primary="BDE ISIMA" />
          </ListItem>

          <Link href="/">
            <Button
              className={`w-11/12 rounded-full my-1`}
              variant="text"
              size="small"
              onClick={onClose}
            >
              <ListItem dense disableGutters>
                <ListItemIcon>
                  <HomeOutline />
                </ListItemIcon>

                <ListItemText secondary="ACCUEIL" secondaryTypographyProps={{ color: "primary" }} />
              </ListItem>
            </Button>
          </Link>

          {ItemsList}

          <DashboardMobile onClose={onClose} />
        </List>

        <ListItem>
          <ListItemText
            secondary={`Version ${globalThis.appVersion}`}
            secondaryTypographyProps={{ align: "center" }}
          />
        </ListItem>
      </div>
    </SwipeableDrawer>
  )
}
