import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide'
import { Image, useSession } from 'blitz'
import AppBar from '@mui/material/AppBar'
import Dialog from '@mui/material/Dialog'
import Toolbar from '@mui/material/Toolbar'
import { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
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
import { useMediaQuery } from 'app/core/styles/theme'
import logo from 'public/static/images/logos/logo.svg'
import LoginContent from 'app/components/auth/LoginContent'

export default function Nav() {
  const session = useSession()
  const { pushRoute } = useRouter()
  const [isOnTop, setIsOnTop] = useState(
    typeof window === 'undefined' ? true : window.scrollY === 0
  )
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false)

  const fullScreen = useMediaQuery('md')

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

          {fullScreen && (
            <IconButton
              className="text-primary dark:text-secondary"
              aria-label="Menu"
              onClick={toggleDrawer(setIsMobileMenuOpen, true)}
              size="large"
            >
              <Menu />
            </IconButton>
          )}

          <Link className="mx-auto lg:ml-0" href="/">
            <Image
              className="rounded-full"
              src={logo}
              width={40}
              height={40}
              alt="Logo BDE ISIMA"
            />
          </Link>

          {!fullScreen && <Desktop />}

          {!session.userId ? (
            <Fab
              className={`${!fullScreen && 'ml-4'}`}
              variant={fullScreen ? 'circular' : 'extended'}
              onClick={toggleDrawer(setIsLoginMenuOpen, true)}
              aria-label="Se connecter"
              size={fullScreen ? 'small' : 'large'}
              color="primary"
            >
              <Login className={`${!fullScreen && 'mr-2'}`} />
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
              <Account className={`${!fullScreen && 'mr-2'}`} />
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
