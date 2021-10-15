import { Image } from 'blitz'
import CircularProgress from '@mui/material/CircularProgress'

import logo from 'public/static/images/favicons/android-chrome-192x192.png'

export default function Splash() {
  return (
    <div className="flex flex-col min-h-main items-center justify-center">
      <Image src={logo} alt="Logo BDE ISIMA" />
      <CircularProgress className="m-4 text-primary dark:text-secondary" size={25} />
    </div>
  )
}
