import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

import { useMediaQuery } from 'app/core/styles/theme';

export default function Landing() {
  const fullScreen = useMediaQuery('md');

  return (
    <Box>
      <Image
        src={`/static/images/illustrations/${fullScreen ? 'MobileBackground' : 'Background'}.svg`}
        layout="fill"
        objectFit="cover"
        alt="Fond d'écran"
        quality={100}
        priority
      />
      <Container className="overflow-hidden min-h-screen py-0 relative">
        <a id="landing" href="#landing" />
        <div className="mt-28 flex flex-col justify-center">
          <Typography className="text-6xl text-center md:text-left" paragraph>
            <b>BDE ISIMA</b>
          </Typography>
          <Typography className="text-xl text-center md:text-left" paragraph>
            L&apos;Association des Étudiants Ingénieurs de l&apos;ISIMA
          </Typography>
        </div>
      </Container>
    </Box>
  );
}
