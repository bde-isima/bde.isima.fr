import { useEffect, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import Account from '@mui/icons-material/AccountCircleTwoTone';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeftTwoTone';
import Login from '@mui/icons-material/LoginTwoTone';
import Menu from '@mui/icons-material/MenuTwoTone';

import Image from 'next/image';

import { useSession } from '@blitzjs/auth';

import LoginContent from 'app/components/auth/LoginContent';
import Link from 'app/core/lib/Link';
import { useRouter } from 'app/core/lib/router';
import { useMediaQuery } from 'app/core/styles/theme';

import Desktop from './Desktop';
import Mobile from './Mobile';

export default function Nav() {
  const session = useSession();
  const { pushRoute } = useRouter();
  const [isOnTop, setIsOnTop] = useState(typeof window === 'undefined' ? true : window.scrollY === 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);

  const fullScreen = useMediaQuery('md');

  const toggleDrawer = (fn: any, open: boolean) => () => fn(open);

  const onScroll = () => setIsOnTop(window.scrollY === 0);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('onScroll', onScroll);
  });

  return (
    <AppBar className="h-16 justify-center" elevation={Number(!isOnTop)} position="fixed" color="transparent">
      <Toolbar variant="dense">
        <Mobile
          isOpen={isMobileMenuOpen}
          onOpen={toggleDrawer(setIsMobileMenuOpen, true)}
          onClose={toggleDrawer(setIsMobileMenuOpen, false)}
          onLoginRequested={toggleDrawer(setIsLoginMenuOpen, true)}
        />

        {fullScreen && (
          <IconButton aria-label="Menu" onClick={toggleDrawer(setIsMobileMenuOpen, true)} size="large" color="inherit">
            <Menu />
          </IconButton>
        )}

        <Link className="mx-auto lg:ml-0 leading-none" href="/">
          <Image src="/static/images/logos/logo.svg" width={40} height={40} quality={100} alt="Logo BDE ISIMA" />
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
                <KeyboardArrowLeftIcon />
              </IconButton>
            </DialogActions>

            <LoginContent />
          </Dialog>
        )}
      </Toolbar>
    </AppBar>
  );
}
