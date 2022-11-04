import { cloneElement } from 'react';

import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Account from '@mui/icons-material/AccountCircleTwoTone';
import Login from '@mui/icons-material/LoginTwoTone';

import Image from 'next/image';

import { useSession } from '@blitzjs/auth';

import Link from 'app/core/lib/Link';
import { useRouter } from 'app/core/lib/router';

import config from './config';

export default function Mobile({ isOpen, onOpen, onClose, onLoginRequested }) {
  const session = useSession();
  const { router, pushRoute } = useRouter();

  const iOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const ItemsList = () => (
    <>
      {config.map((obj) => {
        const isActive = obj.isActive(router.asPath, window.location.hash);

        return (
          <Link key={obj.text} href={obj.to}>
            <Button
              className={'w-11/12 rounded-full my-1'}
              variant={isActive ? 'contained' : 'text'}
              size="small"
              onClick={onClose}
            >
              <ListItem dense disableGutters>
                <ListItemIcon>
                  {cloneElement(obj.icon, { className: isActive ? 'text-black' : undefined })}
                </ListItemIcon>

                <ListItemText
                  secondary={obj.text}
                  secondaryTypographyProps={{ color: isActive ? 'black' : 'textPrimary' }}
                />
              </ListItem>
            </Button>
          </Link>
        );
      })}
    </>
  );

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      PaperProps={{ className: 'w-3/4 bg-zinc-100/90 dark:bg-zinc-900/95 backdrop-blur-xl' }}
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
            {session.userId ? (
              <Fab variant="extended" onClick={pushRoute('/hub')} aria-label="Mon compte" color="primary">
                <Account className="mr-2" />
                MON COMPTE
              </Fab>
            ) : (
              <Fab variant="extended" onClick={onLoginRequested} aria-label="Se connecter" color="primary">
                <Login className="mr-2" />
                SE CONNECTER
              </Fab>
            )}
          </div>
        </List>

        <ListItem>
          <ListItemText secondary={`Version ${globalThis.version}`} secondaryTypographyProps={{ align: 'center' }} />
        </ListItem>
      </div>
    </SwipeableDrawer>
  );
}
