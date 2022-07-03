import { Routes } from "@blitzjs/next";
import { BlitzPage } from "@blitzjs/next";
import { Suspense } from 'react'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import getHubNav from 'app/components/nav/hub/getHubNav'
import Elections from 'app/components/hub/elections/Elections'
import HowItWorks from 'app/components/hub/elections/HowItWorks'
import CandidateItem from 'app/components/hub/elections/CandidateItem'

const FallbackComponent = [...Array(2).keys()].map((x) => <CandidateItem key={x} isLoading />)

const ElectionsIndex: BlitzPage = () => {
  return (
    <div className="flex flex-col">
      <Typography variant="h4" paragraph align="right" color="textPrimary">
        Élections BDE
      </Typography>

      <Divider className="m-4" />

      <HowItWorks />

      <Grid
        container
        className="flex flex-col md:flex-row items-center"
        justifyContent="center"
        gap={5}
      >
        <Suspense fallback={FallbackComponent}>
          <Elections />
        </Suspense>
      </Grid>
    </div>
  )
}

ElectionsIndex.suppressFirstRenderFlicker = true
ElectionsIndex.authenticate = { redirectTo: Routes.Login() }
ElectionsIndex.getLayout = (page) => getHubNav(page, 'Élections BDE')

export default ElectionsIndex
