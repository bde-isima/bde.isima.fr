import Link from "next/link"
import Image from "next/image"
import { useSession } from "blitz"
import Fab from "@material-ui/core/Fab"
import { useState, useEffect } from "react"
import Slide from "@material-ui/core/Slide"
import AppBar from "@material-ui/core/AppBar"
import Dialog from "@material-ui/core/Dialog"
import Hidden from "@material-ui/core/Hidden"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import { useTheme, useMediaQuery } from "@material-ui/core"
import DialogActions from "@material-ui/core/DialogActions"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"

import Menu from "mdi-material-ui/Menu"
import ArrowLeft from "mdi-material-ui/ArrowLeft"
import LoginVariant from "mdi-material-ui/LoginVariant"
import AccountArrowRightOutline from "mdi-material-ui/AccountArrowRightOutline"

import Mobile from "./Mobile"
import Desktop from "./Desktop"
import LoginContent from "app/components/auth/LoginContent"
import { useCustomRouter } from "app/hooks/useCustomRouter"

export default function Nav() {
  const session = useSession()
  const { pushRoute } = useCustomRouter()
  const [isOnTop, setIsOnTop] = useState(
    typeof window === "undefined" ? true : window.scrollY === 0
  )
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const toggleDrawer = (fn, open) => () => fn(open)

  const onScroll = () => setIsOnTop(window.scrollY === 0)

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("onScroll", onScroll)
  })

  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      <AppBar
        className="h-16 justify-center"
        elevation={Number(!isOnTop)}
        position="fixed"
        color="inherit"
      >
        <Toolbar variant="dense">
          <Mobile
            isOpen={isMobileMenuOpen}
            onOpen={toggleDrawer(setIsMobileMenuOpen, true)}
            onClose={toggleDrawer(setIsMobileMenuOpen, false)}
            onLoginRequested={toggleDrawer(setIsLoginMenuOpen, true)}
          />

          <Hidden mdUp>
            <div className="flex flex-grow justify-start">
              <IconButton
                aria-label="Menu"
                onClick={toggleDrawer(setIsMobileMenuOpen, true)}
                color="inherit"
              >
                <Menu />
              </IconButton>
            </div>
          </Hidden>

          <div className="h-full w-full flex items-center justify-center md:justify-end">
            <Link href="/" passHref>
              <div className="mx-auto md:ml-0">
                <Image
                  className="rounded-full"
                  src="/static/images/logos/logo.svg"
                  width={40}
                  height={40}
                  alt="Logo BDE ISIMA"
                />
              </div>
            </Link>

            <Hidden mdDown>
              <Desktop />
            </Hidden>
          </div>

          {!session?.userId ? (
            <Fab
              className={`${!fullScreen && "ml-4"}`}
              variant="extended"
              onClick={toggleDrawer(setIsLoginMenuOpen, true)}
              aria-label="Se connecter"
              color="primary"
            >
              <LoginVariant />
              {!fullScreen && "Se connecter"}
            </Fab>
          ) : (
            <Fab
              className={`${!fullScreen && "ml-4"}`}
              variant="extended"
              onClick={pushRoute("/hub")}
              aria-label="Mon compte"
              color="primary"
            >
              <AccountArrowRightOutline />
              {!fullScreen && "Mon compte"}
            </Fab>
          )}

          {!session?.userId && (
            <Dialog
              open={isLoginMenuOpen}
              fullScreen={fullScreen}
              onClose={toggleDrawer(setIsLoginMenuOpen, false)}
            >
              <DialogActions>
                <IconButton
                  className="mr-auto"
                  onClick={toggleDrawer(setIsLoginMenuOpen, false)}
                  aria-label="Retour"
                >
                  <ArrowLeft />
                </IconButton>
              </DialogActions>

              <LoginContent />
            </Dialog>
          )}
        </Toolbar>
      </AppBar>
    </Slide>
  )
}
