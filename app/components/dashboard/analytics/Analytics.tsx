import Grid from '@material-ui/core/Grid'

import ArticlesStats from './ArticlesStats'
import CurrentBalance from './CurrentBalance'

export default function Analytics() {
    return(
        <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
                <CurrentBalance />
            </Grid>

            <Grid item xs={12} md={6}>
                <ArticlesStats />
            </Grid>
        </Grid>
    )
}
