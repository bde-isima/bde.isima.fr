import Image from "next/image"
import { Suspense } from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"

import Carousel from "./carousel"
import getClubs from "app/entities/clubs/queries/getClubs"

export default function Clubs() {
  return (
    <Paper className="bg-primary min-h-screen">
      <Container className="min-h-screen">
        <div className="px-2 py-8 md:p-8">
          <a id="clubs" href="#clubs" />

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
              <Typography
                className="leading-9"
                variant="subtitle2"
                color="secondary"
                align="justify"
              >
                Le BDE se décompose en une multitude de clubs avec chacun une activité propre. Il y
                en a pour tous les goûts (activités associatives scientifiques, techniques,
                technologiques, culturelles ou encore sportives) et c'est souvent Isibouffe qui
                régale ! <br />
                La vie associative est un aspect très important du BDE, quelles que soient tes
                passions tu trouveras forcément un club qui te plaira !
              </Typography>
            </Grid>
          </Grid>

          <Suspense fallback={<CircularProgress className="mx-auto" size={25} color="secondary" />}>
            <Carousel getQuery={getClubs} queryKey="clubs" />
          </Suspense>
        </div>
      </Container>
    </Paper>
  )
}
