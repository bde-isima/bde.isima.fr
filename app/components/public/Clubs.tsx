import { Image } from 'blitz'
import { Suspense } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import { Club } from 'db'
import Carousel from './carousel'
import getClubs from 'app/entities/clubs/queries/getClubs'

export default function Clubs() {
  return (
    <Paper className="flex flex-col bg-primary px-2 py-8 min-h-screen">
      <a id="clubs" href="#clubs" />

      <Container>
        <Typography variant="h3" align="right" color="secondary" gutterBottom>
          <b>LES CLUBS DU BDE</b>
        </Typography>

        <Grid container>
          <Grid item xs={12} md={6}>
            <Image
              src="/static/images/illustrations/Clubs.svg"
              width={500}
              height={300}
              layout="responsive"
              alt="Illustration"
            />
          </Grid>

          <Grid container item xs={12} md={6} alignItems="center">
            <Typography className="leading-9" variant="subtitle2" color="secondary" align="justify">
              Le BDE se décompose en une multitude de clubs avec chacun une activité propre. Il y en
              a pour tous les goûts (activités associatives scientifiques, techniques,
              technologiques, culturelles ou encore sportives) et c&apos;est souvent Isibouffe qui
              régale ! <br />
              La vie associative est un aspect très important du BDE, quelles que soient tes
              passions tu trouveras forcément un club qui te plaira !
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Suspense fallback={<CircularProgress className="mx-auto" size={25} color="secondary" />}>
        <Carousel<Club> getQuery={getClubs} queryKey="clubs" />
      </Suspense>
    </Paper>
  )
}
