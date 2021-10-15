import { Image } from 'blitz'
import Typography from '@mui/material/Typography'

import noData from 'public/static/images/illustrations/NoData.svg'

export default function NoElections() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src={noData} width={500} height={500} alt="Il n'y a pas d'élection BDE en cours" />

      <Typography variant="h5" color="textPrimary" align="center" paragraph>
        Il n&apos;y a pas d&apos;élections BDE en cours
      </Typography>
    </div>
  )
}
