import Typography from '@mui/material/Typography'
import { BlitzPage, Routes } from 'blitz'
import Paper from '@mui/material/Paper'

import AverageModule from 'app/components/hub/average/AverageModule'
import getHubNav from 'app/components/nav/hub/getHubNav'

const Average: BlitzPage = () => {
  return (
    <Paper className="p-4 mb-10">
      <Typography variant="h4" paragraph>
        Calculateur de moyenne
      </Typography>

      <Typography color="textSecondary" variant="caption" paragraph>
        Séléctionnez votre année, remplissez le tableau et votre moyenne sera calculée. <br />
        Les données saisies seront uniquement stockées sur votre navigateur et resteront strictement
        personnelles.
      </Typography>

      <AverageModule />
    </Paper>
  )
}

Average.suppressFirstRenderFlicker = true
Average.authenticate = { redirectTo: Routes.Login() }
Average.getLayout = (page) => getHubNav(page, 'Calculateur de moyenne')

export default Average
