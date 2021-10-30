import Grid from '@mui/material/Grid'
import { BlitzPage, Routes } from 'blitz'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import AverageModule from 'app/components/hub/average/AverageModule'
import getHubNav from '../../../components/nav/hub/getHubNav'
import ElectionsIndex from '../elections'

const AverageIndex: BlitzPage = () => {
  return (
    <div className="flex flex-col">
      <Typography variant="h4" paragraph align="right" color="textPrimary">
        Calculateur de moyenne
      </Typography>

      <Divider className="m-4" />

      <Typography color="textSecondary" variant="caption" paragraph>
        Séléctionnez votre année, remplissez le tableau et votre moyenne sera calculée. <br />
        Les données saisies seront uniquement stockées sur votre navigateur et resteront strictement
        personnelles.
      </Typography>

      <AverageModule />
    </div>
  )
}

AverageIndex.suppressFirstRenderFlicker = true
AverageIndex.authenticate = { redirectTo: Routes.Login() }
AverageIndex.getLayout = (page) => getHubNav(page, 'Calculateur de moyenne')

export default AverageIndex
