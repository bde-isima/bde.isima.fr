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
  const { pushRoute } = useRouter();

  const iOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const ItemsList = () => (
    <>
      {config.map((obj) => {
        return (
          <Link key={obj.text} href={obj.to}>
            <Button className="px-4 my-1" variant="text" size="small" onClick={onClose} fullWidth={true}>
              <ListItem dense disableGutters>
                <ListItemIcon className="min-w-40 ml-2 mr-4">
                  {cloneElement(obj.icon, { className: 'm-auto' })}
                </ListItemIcon>

                <ListItemText secondary={obj.text} secondaryTypographyProps={{ color: 'textPrimary' }} />
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
      PaperProps={{ className: 'w-3/4 bg-bl1/90 backdrop-blur-xl border-y-0 border-l-0' }}
    >
      <div className="text-center">
        <List>
          <ListItem>
            <ListItemIcon>
              <div className="m-2 mr-4">
                <Image src="/static/images/logos/logo.svg" width={40} height={40} alt="Logo BDE ISIMA" />
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
