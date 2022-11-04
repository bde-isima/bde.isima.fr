import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import Menu from '@mui/icons-material/MenuTwoTone';

import Image from 'next/image';

import AccountMenu from 'app/components/nav/hub/submenus/AccountMenu';
import ModulesMenu from 'app/components/nav/hub/submenus/ModulesMenu';
import Link from 'app/core/lib/Link';
import { useMediaQuery } from 'app/core/styles/theme';

import Desktop from './Desktop';
import Mobile from './Mobile';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const fullScreen = useMediaQuery('md');

  const toggleDrawer = (open) => () => setIsOpen(open);

  return (
    <AppBar className="h-16 justify-center" position="fixed" color="inherit">
      <Toolbar variant="dense">
        <Mobile isOpen={isOpen} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)} />

        {fullScreen && (
          <div className="flex flex-grow justify-start">
            <IconButton color="inherit" aria-label="Menu" onClick={toggleDrawer(true)} size="large">
              <Menu />
            </IconButton>
          </div>
        )}

        {!fullScreen && (
          <>
            <Link href="/">
              <div className="flex mr-4">
                <Image
                  className="rounded-full"
                  src="/static/images/logos/logo.svg"
                  width={40}
                  height={40}
                  alt="Logo BDE ISIMA"
                />
              </div>
            </Link>

            <div className="h-full w-full flex items-center">
              <Desktop />
            </div>
          </>
        )}

        <ModulesMenu />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
