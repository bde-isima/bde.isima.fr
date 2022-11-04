import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

import Link from 'app/core/lib/Link';

import Socials from './Socials';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Paper className="p-6">
      <Grid className="py-4" spacing={3} container>
        <Grid container item xs={12} md={4} justifyContent="center" alignContent="center" gap={2}>
          <Grid container item xs={12} md={6} justifyContent="center">
            <Image src="/static/images/logos/logo.svg" width={80} height={80} quality={100} alt="Logo BDE ISIMA" />
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

        <Grid container gap={6} item xs={12} md={4} justifyContent="center" alignContent="center">
          <Image src="/static/images/logos/inp.svg" width={80} height={80} alt="Logo de l'INP" quality={100} />
          <Image src="/static/images/logos/uca.svg" width={80} height={80} alt="Logo de l'UCA" quality={100} />
        </Grid>

        <Grid container item xs={12} md={4} justifyContent="center" alignItems="center" direction="column">
          <Socials />
        </Grid>

        <Grid container item xs={12} direction="column">
          <Grid container item xs={12} justifyContent="center" alignItems="center">
            <Typography className="mx-4" variant="body2" component="span">
              <b>BDE ISIMA © {currentYear}</b>
            </Typography>
            -
            <Link href="/privacy">
              <Typography className="mx-4" variant="body2">
                Politique de confidentialité
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
