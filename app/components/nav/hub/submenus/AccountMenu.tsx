import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import Feedback from '@mui/icons-material/FeedbackTwoTone';
import Logout from '@mui/icons-material/LogoutTwoTone';
import SettingsApplications from '@mui/icons-material/SettingsApplicationsTwoTone';

import Image from 'next/image';

import { useAuthenticatedSession } from '@blitzjs/auth';
import { useMutation } from '@blitzjs/rpc';

import Link from 'app/core/lib/Link';
import logout from 'app/entities/auth/mutations/logout';

import Menu from './Menu';

export default function AccountMenu() {
  const session = useAuthenticatedSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const [signOut] = useMutation(logout);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const onLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex mx-2">
      {session?.image ? (
        <Image
          className="rounded-full"
          src={session.image}
          onClick={handleOpen}
          width={40}
          height={40}
          alt="Photo de profil"
        />
      ) : (
        <Avatar onClick={handleOpen} alt="Photo de profil" />
      )}

      <Menu id="account-menu" anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        <Typography className="pt-4 pl-4 pr-4" variant="subtitle1" noWrap>
          {session?.nickname || `${session?.firstname} ${session?.lastname}`}
        </Typography>

        <Divider className="m-3" />

        <Link href="/hub/settings">
          <MenuItem className="p-3" onClick={handleClose}>
            <ListItemIcon>
              <SettingsApplications />
            </ListItemIcon>
            <Typography className="flex flex-grow items-center" variant="subtitle2" align="center">
              Paramètres
            </Typography>
          </MenuItem>
        </Link>

        <Link href="/hub/feedback">
          <MenuItem className="p-3" onClick={handleClose}>
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            <Typography className="flex flex-grow items-center" variant="subtitle2" align="center">
              Feedback
            </Typography>
          </MenuItem>
        </Link>

        <MenuItem className="p-3" onClick={onLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <Typography className="flex flex-grow items-center" variant="subtitle2" align="center">
            Déconnexion
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
