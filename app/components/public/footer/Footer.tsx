import Link from "next/link"
import Image from "next/image"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

import Socials from "./Socials"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Paper className="p-6">
      <Grid className="py-4" spacing={3} container>
        <Grid container item xs={12} md={4} justifyContent="center" alignContent="center">
          <Grid container item xs={12} md={6} justifyContent="center">
            <Image
              src="/static/images/logos/logo.svg"
              width={80}
              height={80}
              quality={100}
              alt="Logo BDE ISIMA"
            />
          </Grid>
          <Grid container item xs={12} md={6} justifyContent="center" alignItems="center">
            <Typography variant="caption" align="center">
              AEI ISIMA
              <br />
              1 Rue de la Chebarde
              <br />
              TSA 60125 - CS 60026
              <br />
              63170 AUBIERE
            </Typography>
          </Grid>
        </Grid>

        <Grid container item xs={12} md={4} justifyContent="center" alignContent="center">
          <Image
            src="/static/images/logos/uca.png"
            width={300}
            height={45}
            quality={100}
            alt="Logo de l'UCA"
          />
        </Grid>

        <Grid
          container
          item
          xs={12}
          md={4}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Socials />
        </Grid>

        <Grid container item xs={12} direction="column">
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
            component={Typography}
            color="textSecondary"
          >
            <Typography className="mx-4" variant="body2" color="textSecondary" component="span">
              <b>BDE ISIMA © {currentYear}</b>
            </Typography>
            -
            <Link href="/privacy">
              <Typography className="mx-4 text-primary" variant="body2" component="a">
                Politique de confidentialité
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
