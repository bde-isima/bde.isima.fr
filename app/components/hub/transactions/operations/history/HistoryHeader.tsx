import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography'

export default function HistoryHeader() {
    return (
        <Grid container>
            <Grid container item xs={2} justifyContent="center">
                <Typography variant="caption">Débit/Crédit</Typography>
            </Grid>
            <Grid container item xs={6} justifyContent="center">
                <Typography variant="caption">Description/Date</Typography>
            </Grid>
            <Grid container item xs={2} justifyContent="center">
                <Typography variant="caption">Montant</Typography>
            </Grid>
            <Grid container item xs={2} justifyContent="center">
                <Typography variant="caption">Ancien solde</Typography>
            </Grid>
        </Grid>
    )
}