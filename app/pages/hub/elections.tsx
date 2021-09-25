import { Suspense } from 'react'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import PageTitle from 'app/core/layouts/PageTitle'
import Elections from 'app/components/hub/elections/Elections'
import HowItWorks from 'app/components/hub/elections/HowItWorks'
import CandidateItem from 'app/components/hub/elections/CandidateItem'

export default function ElectionsIndex() {
  const FallbackComponent = [...Array(2).keys()].map((x) => <CandidateItem key={x} isLoading />)

  return (
    <>
      <PageTitle title="Élections BDE" />

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
          spacing={5}
        >
          <Suspense fallback={FallbackComponent}>
            <Elections />
          </Suspense>
        </Grid>
      </div>
    </>
  )
}
