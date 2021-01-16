import Link from "next/link"
import Image from "next/image"
import { useSession } from "blitz"
import { cloneElement } from "react"
import Fab from "@material-ui/core/Fab"
import List from "@material-ui/core/List"
import Button from "@material-ui/core/Button"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"

import LoginVariant from "mdi-material-ui/LoginVariant"
import AccountArrowRightOutline from "mdi-material-ui/AccountArrowRightOutline"

import config from "./config"
import { useCustomRouter } from "app/hooks/useCustomRouter"

export default function Mobile({ isOpen, onOpen, onClose, onLoginRequested }) {
  const session = useSession()
  const { router, pushRoute } = useCustomRouter()

  const iOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const ItemsList = () => (
    <>
      {config.map((obj) => {
        const isActive = obj.isActive(router.asPath, window.location.hash)

        return (
          <Link key={obj.text} href={obj.to}>
            <Button
              className={`${isActive && "bg-primary"} w-11/12 rounded-full my-1`}
              variant={isActive ? "contained" : "text"}
              size="small"
              onClick={onClose}
            >
              <ListItem dense disableGutters>
                <ListItemIcon>
                  {cloneElement(obj.icon, { className: isActive ? "text-white" : undefined })}
                </ListItemIcon>

                <ListItemText
                  secondary={obj.text}
                  secondaryTypographyProps={{ color: isActive ? "secondary" : "primary" }}
                />
              </ListItem>
            </Button>
          </Link>
        )
      })}
    </>
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

          <ItemsList />

          <div className="m-3 flex justify-center">
            {session?.userId ? (
              <Fab
                variant="extended"
                onClick={pushRoute("/hub")}
                aria-label="Mon compte"
                color="primary"
              >
                <AccountArrowRightOutline className="mr-2" />
                MON COMPTE
              </Fab>
            ) : (
              <Fab
                variant="extended"
                onClick={onLoginRequested}
                aria-label="Se connecter"
                color="primary"
              >
                <LoginVariant className="mr-2" />
                SE CONNECTER
              </Fab>
            )}
          </div>
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
