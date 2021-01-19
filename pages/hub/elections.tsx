import { Suspense } from "react"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"

import PageTitle from "app/layouts/PageTitle"
import Elections from "app/components/hub/elections/Elections"
import HowItWorks from "app/components/hub/elections/HowItWorks"
import CandidateItem from "app/components/hub/elections/CandidateItem"

export default function ElectionsIndex() {
  const FallbackComponent = [...Array(2).keys()].map((x) => <CandidateItem key={x} isLoading />)

  return (
    <>
      <PageTitle title="Élections BDE" />

      <div className="flex flex-col">
        <Typography variant="h4" paragraph align="right">
          Élections BDE
        </Typography>

        <Divider className="m-4" />

        <HowItWorks />

        <Grid container className="flex flex-col md:flex-row items-center" spacing={5}>
          <Suspense fallback={FallbackComponent}>
            <Elections />
          </Suspense>
        </Grid>
      </div>
    </>
  )
}
