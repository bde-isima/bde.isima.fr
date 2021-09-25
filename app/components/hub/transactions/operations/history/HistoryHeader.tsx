import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function HistoryHeader() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))

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
