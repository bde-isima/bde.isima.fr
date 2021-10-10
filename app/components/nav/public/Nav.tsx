import Fab from '@mui/material/Fab'
import Slide from '@mui/material/Slide'
import { Image, useSession } from 'blitz'
import AppBar from '@mui/material/AppBar'
import Dialog from '@mui/material/Dialog'
import Hidden from '@mui/material/Hidden'
import Toolbar from '@mui/material/Toolbar'
import { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import { useTheme, useMediaQuery } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import useScrollTrigger from '@mui/material/useScrollTrigger'

import Menu from '@mui/icons-material/MenuTwoTone'
import Login from '@mui/icons-material/LoginTwoTone'
import ArrowLeft from '@mui/icons-material/ArrowLeftTwoTone'
import Account from '@mui/icons-material/AccountCircleTwoTone'

import Mobile from './Mobile'
import Desktop from './Desktop'
import Link from 'app/core/lib/Link'
import { useRouter } from 'app/core/lib/router'
import LoginContent from 'app/components/auth/LoginContent'

export default function Nav() {
  const session = useSession()
  const { pushRoute } = useRouter()
  const [isOnTop, setIsOnTop] = useState(
    typeof window === 'undefined' ? true : window.scrollY === 0
  )
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'))

  const toggleDrawer = (fn: any, open: boolean) => () => fn(open)

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
                size="large"
              >
                <Menu />
              </IconButton>
            </div>
          </Hidden>

          <Link href="/">
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

          <Hidden xlDown>
            <div className="h-full w-full flex items-center justify-center md:justify-end">
              <Desktop />
            </div>
          </Hidden>

          {!session.userId ? (
            <Fab
              className={`${!fullScreen && 'ml-4'}`}
              variant={fullScreen ? 'circular' : 'extended'}
              onClick={toggleDrawer(setIsLoginMenuOpen, true)}
              aria-label="Se connecter"
              size={fullScreen ? 'small' : 'large'}
              color="primary"
            >
              <Login />
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
              <Account />
              {!fullScreen && 'Mon compte'}
            </Fab>
          )}

          {!session.userId && (
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
                  size="large"
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
