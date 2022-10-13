import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Link from 'app/core/lib/Link';
import { useRouter } from 'app/core/lib/router';

type DesktopMenuItemProps = {
  item: any;
};

export default function DesktopMenuItem({ item }: DesktopMenuItemProps) {
  const { router } = useRouter();

  const isActive = item.isActive(router.asPath, window.location.hash);

  return (
    <Link className="w-full" href={item.to}>
      <Button
        className={`w-full p-2 h-16 rounded-none text-primary dark:text-secondary ${
          isActive && 'border-b border-solid border-primary dark:border-secondary'
        }`}
        aria-label={item.text}
      >
        {item.icon}
        <Typography className={`m-2 ${isActive ? 'bold' : 'normal'}`} variant="subtitle2" color="textPrimary">
          {item.text}
        </Typography>
      </Button>
    </Link>
  );
}
