import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default function HistoryHeader() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid container>
      {!fullScreen && (
        <Grid container item xs={2} justifyContent="center">
          <Typography variant="caption">Type</Typography>
        </Grid>
      )}
      <Grid container item xs={6} justifyContent="center">
        <Typography variant="caption">Description</Typography>
      </Grid>
      <Grid container item xs={fullScreen ? 3 : 2} justifyContent="center">
        <Typography variant="caption">Montant</Typography>
      </Grid>
      <Grid container item xs={fullScreen ? 3 : 2} justifyContent="flex-end">
        <Typography align="right" variant="caption">
          Ancien solde
        </Typography>
      </Grid>
    </Grid>
  )
}
