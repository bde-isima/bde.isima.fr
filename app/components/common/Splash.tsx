import CircularProgress from '@mui/material/CircularProgress';

import Image from 'next/image';

export default function Splash() {
  return (
    <div className="flex flex-col min-h-main items-center justify-center">
      <Image src="/static/images/favicons/android-chrome-192x192.png" width={192} height={192} alt="Logo BDE ISIMA" />
      <CircularProgress className="m-4 text-primary dark:text-secondary" size={25} />
    </div>
  );
}
