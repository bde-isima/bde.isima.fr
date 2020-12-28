import { Image } from "blitz"
import Paper from "@material-ui/core/Paper"
import { useTheme } from '@material-ui/core'
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default function Landing() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Paper className="min-h-main relative">
      <Image
        alt="Fond d'écran"
        src={`/static/images/illustrations/${fullScreen ? "MobileBackground" : "Background"}.svg`}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <Container className="mt-16 py-0 flex flex-col">
        <div className="flex flex-col justify-center mt-12">
          <Typography className="text-6xl text-center md:text-left" paragraph>
            <b>BDE ISIMA</b>
          </Typography>
          <Typography className="text-xl text-center md:text-left" paragraph>
            L'Association des Étudiants Ingénieurs de l'ISIMA
          </Typography>
        </div>
      </Container>
    </Paper>
  )
}
