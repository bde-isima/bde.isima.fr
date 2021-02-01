import Link from "next/link"
import Image from "next/image"
import { useMemo, Suspense } from "react"
import List from "@material-ui/core/List"
import Button from "@material-ui/core/Button"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import CircularProgress from "@material-ui/core/CircularProgress"

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
              <div className="m-2 mr-4">
                <Image
                  className="rounded-full"
                  src="/static/images/logos/logo.svg"
                  width={40}
                  height={40}
                  alt="Logo BDE ISIMA"
                />
              </div>
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

                <ListItemText
                  secondary="ACCUEIL"
                  secondaryTypographyProps={{ color: "textPrimary" }}
                />
              </ListItem>
            </Button>
          </Link>

          {ItemsList}

          <Suspense
            fallback={
              <CircularProgress
                className="mx-auto my-2 text-primary dark:text-secondary"
                size={25}
              />
            }
          >
            <DashboardMobile onClose={onClose} />
          </Suspense>
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
