import Button from '@mui/material/Button';

import Link from 'app/core/lib/Link';

import config from './config';

export default function Desktop() {
  return (
    <>
      {config.map((obj) => {
        return (
          <Link key={obj.to} href={obj.to}>
            <Button className="p-2 h-16" color="inherit" aria-label={obj.text}>
              {obj.icon}
              <div className="m-2">{obj.text}</div>
            </Button>
          </Link>
        );
      })}
    </>
  );
}
