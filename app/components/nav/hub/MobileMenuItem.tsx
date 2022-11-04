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
      <Button className="px-4 my-1" variant="text" size="small" onClick={onClose} fullWidth={true}>
        <ListItem dense disableGutters>
          <ListItemIcon className="min-w-40 ml-2 mr-4">
            {cloneElement(item.icon, { className: `m-auto ${isActive ? 'text-primary' : ''}` })}
          </ListItemIcon>

          <ListItemText
            secondary={item.text}
            secondaryTypographyProps={{
              color: isActive ? 'primary.main' : 'textPrimary',
              className: isActive ? 'font-bold' : 'font-normal'
            }}
          />
        </ListItem>
      </Button>
    </Link>
  );
}
