import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

import { useMediaQuery } from 'app/core/styles/theme';

export default function Landing() {
  const fullScreen = useMediaQuery('md');

  return (
    <Paper className="min-h-main relative">
      <a id="landing" href="#landing" />
      <Image
        src={`/static/images/illustrations/${fullScreen ? 'MobileBackground' : 'Background'}.svg`}
        layout="fill"
        objectFit="cover"
        alt="Fond d'écran"
        quality={100}
        priority
      />
      <Container className="mt-16 py-0 flex flex-col">
        <div className="flex flex-col justify-center mt-12">
          <Typography className="text-6xl text-center md:text-left" paragraph>
            <b>BDE ISIMA</b>
          </Typography>
          <Typography className="text-xl text-center md:text-left" paragraph>
            L&apos;Association des Étudiants Ingénieurs de l&apos;ISIMA
          </Typography>
        </div>
      </Container>
    </Paper>
  );
}
