import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Link from '@mui/icons-material/LinkTwoTone';

import Image from 'next/image';

export default function School() {
  return (
    <Container className="min-h-screen">
      <a id="school" href="#school" />

      <div className="px-2 py-8 md:p-8">
        <Typography variant="h3" color="textPrimary" gutterBottom>
          <b>L&apos;ISIMA</b>
        </Typography>

        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography className="leading-9" variant="subtitle2" align="justify" color="textPrimary">
              Le bureau des étudiants (BDE) à l&apos;ISIMA, c&apos;est une partie incontournable de la vie à
              l&apos;école. D&apos;abord parce qu&apos;on organise pleins de soirées et d&apos;événements au cours de
              l&apos;année mais surtout parce que le BDE est indispensable pour obtenir son diplôme à l&apos;ISIMA.
              <a
                href="https://www.cti-commission.fr/fonds-documentaire/document/7/chapitre/179?a=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong> La Commission des Titres d&apos;Ingénieurs </strong>
              </a>
              oblige chaque école à disposer d&apos;une vie étudiante.
              <br />
              L&apos;équipe du BDE, les membres de clubs et les autres associations présentes à l&apos;école sont donc
              responsables de l&apos;accueil et de l&apos;intégration des élèves ainsi du bon déroulement des
              événements.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Image
              src="/static/images/illustrations/School.svg"
              width={500}
              height={300}
              layout="responsive"
              alt="Illustration"
              quality={100}
            />
          </Grid>
        </Grid>

        <div className="p-6 flex flex-col items-center">
          <Fab
            className="mb-16"
            href="https://www.isima.fr/"
            target="_blank"
            rel="noopener noreferrer"
            variant="extended"
            aria-label="Aller sur https://www.isima.fr"
            color="primary"
          >
            <Link className="mr-4" color="secondary" />
            <Typography variant="caption" color="secondary">
              www.isima.fr
            </Typography>
          </Fab>

          <Image
            src="/static/images/logos/inp-isima.svg"
            width={500}
            height={300}
            alt="Logo de l'ISIMA"
            quality={100}
          />
        </div>
      </div>
    </Container>
  );
}
