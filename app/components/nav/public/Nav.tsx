import Link from 'next/link'
import Image from 'next/image'
import Fab from '@mui/material/Fab'
import { useState, useEffect } from 'react'
import Slide from '@mui/material/Slide'
import AppBar from '@mui/material/AppBar'
import Dialog from '@mui/material/Dialog'
import Hidden from '@mui/material/Hidden'
import Toolbar from '@mui/material/Toolbar'
import { useAuthenticatedSession } from 'blitz'
import IconButton from '@mui/material/IconButton'
import { useTheme, useMediaQuery } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import useScrollTrigger from '@mui/material/useScrollTrigger'

import Menu from 'mdi-material-ui/Menu'
import ArrowLeft from 'mdi-material-ui/ArrowLeft'
import LoginVariant from 'mdi-material-ui/LoginVariant'
import AccountArrowRightOutline from 'mdi-material-ui/AccountArrowRightOutline'

import Mobile from './Mobile'
import Desktop from './Desktop'
import LoginContent from 'app/components/auth/LoginContent'
import { useCustomRouter } from 'app/entities/hooks/useCustomRouter'

export default function Nav() {
  const { pushRoute } = useCustomRouter()
  const session = useAuthenticatedSession()
  const [isOnTop, setIsOnTop] = useState(
    typeof window === 'undefined' ? true : window.scrollY === 0
  )
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))

  const toggleDrawer = (fn, open) => () => fn(open)

  const onScroll = () => setIsOnTop(window.scrollY === 0)

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('onScroll', onScroll)
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
            <div className="flex lg:flex-grow justify-start">
              <IconButton
                className="text-primary dark:text-secondary"
                aria-label="Menu"
                onClick={toggleDrawer(setIsMobileMenuOpen, true)}
                size="large">
                <Menu />
              </IconButton>
            </div>
          </Hidden>

          <Link href="/" passHref>
            <div className="mx-auto lg:ml-0">
              <Image
                className="rounded-full"
                src="/static/images/logos/logo.svg"
                width={40}
                height={40}
                alt="Logo BDE ISIMA"
              />
            </div>
          </Link>

          <Hidden lgDown>
            <div className="h-full w-full flex items-center justify-center md:justify-end">
              <Desktop />
            </div>
          </Hidden>

          {!session?.userId ? (
            <Fab
              className={`${!fullScreen && 'ml-4'}`}
              variant={fullScreen ? 'circular' : 'extended'}
              onClick={toggleDrawer(setIsLoginMenuOpen, true)}
              aria-label="Se connecter"
              size={fullScreen ? 'small' : 'large'}
              color="primary"
            >
              <LoginVariant />
              {!fullScreen && 'Se connecter'}
            </Fab>
          ) : (
            <Fab
              className={`${!fullScreen && 'ml-4'}`}
              variant={fullScreen ? 'circular' : 'extended'}
              onClick={pushRoute('/hub')}
              aria-label="Mon compte"
              size={fullScreen ? 'small' : 'large'}
              color="primary"
            >
              <AccountArrowRightOutline />
              {!fullScreen && 'Mon compte'}
            </Fab>
          )}

          {!session?.userId && (
            <Dialog
              open={isLoginMenuOpen}
              fullScreen={fullScreen}
              PaperProps={{ className: 'w-full' }}
              onClose={toggleDrawer(setIsLoginMenuOpen, false)}
            >
              <DialogActions>
                <IconButton
                  className="mr-auto"
                  onClick={toggleDrawer(setIsLoginMenuOpen, false)}
                  aria-label="Retour"
                  size="large">
                  <ArrowLeft />
                </IconButton>
              </DialogActions>

              <LoginContent />
            </Dialog>
          )}
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
