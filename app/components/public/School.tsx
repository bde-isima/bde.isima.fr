import Image from "next/image"
import Fab from "@material-ui/core/Fab"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

import Link from "mdi-material-ui/Link"

export default function School() {
  return (
    <Container className="min-h-screen">
      <div className="px-2 py-8 md:p-8">
        <a id="school" href="#school" />

        <Typography variant="h3" gutterBottom>
          <b>L'ISIMA</b>
        </Typography>

        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography className="leading-9" variant="subtitle2" align="justify">
              Le bureau des étudiants (BDE) à l'ISIMA, c'est une partie incontournable de la vie à
              l'école. D'abord parce qu'on organise pleins de soirées et d'événements au cours de
              l'année mais surtout parce que le BDE est indispensable pour obtenir son diplôme à
              l'ISIMA.
              <a
                href="https://www.cti-commission.fr/fonds-documentaire/document/7/chapitre/179?a=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong> La Commission des Titres d'Ingénieurs </strong>
              </a>
              oblige chaque école à disposer d'une vie étudiante.
              <br />
              L'équipe du BDE, les membres de clubs et les autres associations présentes à l'école
              sont donc responsables de l'accueil et de l'intégration des élèves ainsi du bon
              déroulement des événements.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Image
              src="/static/images/illustrations/School.svg"
              width={500}
              height={300}
              layout="responsive"
              alt="Illustration"
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
            src="/static/images/logos/isima.png"
            width={300}
            height={87}
            alt="Logo de l'ISIMA"
          />
        </div>
      </div>
    </Container>
  )
}
