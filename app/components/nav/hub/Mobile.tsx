import { Suspense, useMemo } from 'react';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Home from '@mui/icons-material/HomeTwoTone';

import Image from 'next/image';

import DashboardMobile from 'app/components/nav/dashboard/Mobile';
import MobileMenuItem from 'app/components/nav/hub/MobileMenuItem';
import Link from 'app/core/lib/Link';

import config from './config';

export default function Mobile({ isOpen, onOpen, onClose }) {
  const iOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const ItemsList = useMemo(
    () => (
      <>
        {config.map((item) => (
          <MobileMenuItem key={item.to} item={item} onClose={onClose} />
        ))}
      </>
    ),
    [onClose]
  );

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      PaperProps={{ className: 'w-3/4' }}
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
            <Button className={'w-11/12 rounded-full my-1'} variant="text" size="small" onClick={onClose}>
              <ListItem dense disableGutters>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>

                <ListItemText secondary="ACCUEIL" secondaryTypographyProps={{ color: 'textPrimary' }} />
              </ListItem>
            </Button>
          </Link>

          {ItemsList}

          <Suspense fallback={<CircularProgress className="mx-auto my-2 text-primary dark:text-secondary" size={25} />}>
            <DashboardMobile onClose={onClose} />
          </Suspense>
        </List>

        <ListItem>
          <ListItemText secondary={`Version ${globalThis.version}`} secondaryTypographyProps={{ align: 'center' }} />
        </ListItem>
      </div>
    </SwipeableDrawer>
  );
}
