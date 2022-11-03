import { cloneElement } from 'react';

import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Link from 'app/core/lib/Link';
import { useRouter } from 'app/core/lib/router';

type MobileMenuItemProps = {
  item: any;
  onClose: () => void;
};

export default function MobileMenuItem({ item, onClose }: MobileMenuItemProps) {
  const { router } = useRouter();

  const isActive = item.isActive(router.asPath, window.location.hash);

  return (
    <Link href={item.to}>
      <Button
        className={'w-11/12 rounded-full my-1'}
        variant={isActive ? 'contained' : 'text'}
        size="small"
        onClick={onClose}
      >
        <ListItem dense disableGutters>
          <ListItemIcon>{cloneElement(item.icon, { className: `${isActive ? 'text-black' : ''}` })}</ListItemIcon>

          <ListItemText
            secondary={item.text}
            secondaryTypographyProps={{ color: isActive ? 'black' : 'textPrimary' }}
          />
        </ListItem>
      </Button>
    </Link>
  );
}
