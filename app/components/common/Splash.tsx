import Image from 'next/image'
import CircularProgress from '@mui/material/CircularProgress'

export default function Splash() {
  return (
    <div className="flex flex-col min-h-main items-center justify-center">
      <Image
        src="/static/images/favicons/android-chrome-192x192.png"
        width={150}
        height={150}
        alt="Logo BDE ISIMA"
      />
      <CircularProgress className="m-4 text-primary dark:text-secondary" size={25} />
    </div>
  )
}
