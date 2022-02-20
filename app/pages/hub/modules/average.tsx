import Paper from '@mui/material/Paper'
import { BlitzPage, Routes } from 'blitz'
import Typography from '@mui/material/Typography'

import getHubNav from 'app/components/nav/hub/getHubNav'
import AverageForm from 'app/components/hub/average/AverageForm'

const Average: BlitzPage = () => {
  return (
    <Paper className="p-4">
      <Typography variant="h4" paragraph>
        Calculateur de moyenne
      </Typography>

      <Typography color="textSecondary" variant="caption" paragraph>
        Séléctionnez votre année, remplissez le tableau et votre moyenne sera calculée. <br />
        Les données saisies seront uniquement stockées sur votre navigateur et resteront strictement
        personnelles.
      </Typography>

      <AverageForm />
    </Paper>
  )
}

Average.suppressFirstRenderFlicker = true
Average.authenticate = { redirectTo: Routes.Login() }
Average.getLayout = (page) => getHubNav(page, 'Calculateur de moyenne')

export default Average
