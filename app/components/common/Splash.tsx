import { Image } from 'blitz'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Splash() {
    return (
        <div className="flex flex-col min-h-main items-center justify-center">
            <Image
                src="/static/images/favicons/android-chrome-192x192.png"
                width={150}
                height={150}
                alt="Logo BDE ISIMA"
            />
            <CircularProgress className="m-2" color="inherit" />
        </div>
    )
}
