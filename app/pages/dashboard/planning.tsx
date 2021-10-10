import { Image, BlitzPage, Routes } from 'blitz'
import Typography from '@mui/material/Typography'

import wip from 'public/static/images/illustrations/WIP.svg'
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav'
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config'

const Planning: BlitzPage = () => {
  return (
    <div className="flex flex-col place-self-center items-center">
      <Image src={wip} alt="Work In Progress" width={500} height={500} />

      <Typography variant="h4" color="textPrimary" paragraph>
        En construction
      </Typography>
    </div>
  )
}

Planning.suppressFirstRenderFlicker = true
Planning.authenticate = { redirectTo: Routes.Login() }
Planning.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Planning())
Planning.getLayout = (page) => getDashboardNav(page, 'Gestion des plannings')

export default Planning
