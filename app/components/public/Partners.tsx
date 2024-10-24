import { Suspense } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Partner } from 'db';

import Image from 'next/image';

import Link from 'app/core/lib/Link';
import getPublicPartners from 'app/entities/partners/queries/getPublicPartners';

import Carousel from './carousel';

export default function Partners() {
  return (
    <Box className="bg-bl1 overflow-hidden">
      <a id="partners" href="#partners" />
      <Container className="px-2 py-8 md:p-8">
        <Typography variant="h3" gutterBottom>
          <b>LES PARTENAIRES DU BDE</b>
        </Typography>

        <Grid container>
          <Grid container item xs={12} md={6} alignItems="center">
            <Typography className="leading-9" variant="subtitle2" align="justify">
              Le BDE dispose d&apos;un membre responsable des partenariats, chargé de trouver et négocier des
              partenariats tout au long de l&apos;année afin de proposer aux élèves toutes sortes d&apos;avantages
              (réductions, offres promotionnelles, etc ...). <br />
              <br />
              Vous êtes intéressés pour entretenir un partenariat avec nous ? <br />
              Envoyez-nous un message via le{' '}
              <Link href="/#contact" className="text-primary">
                <strong>formulaire de contact</strong>
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Image
              src="/static/images/illustrations/Partners.svg"
              width={500}
              height={300}
              layout="responsive"
              alt="Illustration"
              quality={100}
            />
          </Grid>
        </Grid>
      </Container>

      <Suspense fallback={<CircularProgress className="mx-auto" size={25} />}>
        <Carousel<Partner> getQuery={getPublicPartners} queryKey="partners" />
      </Suspense>
    </Box>
  );
}
