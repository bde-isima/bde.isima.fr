import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeftTwoTone';

import Head from 'next/head';
import Image from 'next/image';

import Link from 'app/core/lib/Link';

function Page500({ statusCode }) {
  const errorCode = 500;
  const title = "Oops, quelque chose s'est mal passé";

  return (
    <>
      <Head>
        <title>
          {errorCode}: ({statusCode ? 'server' : 'client'}) {title}
        </title>
      </Head>

      <div className="flex flex-col min-h-main justify-center items-center">
        <Image src="static/images/illustrations/ServerError.svg" width={500} height={500} alt={title} quality={100} />

        <Typography variant="h4" paragraph>
          {title}
        </Typography>

        <Typography className="mb-4" variant="h6">
          T&apos;étais pas censé être là pour être ici ! Désolé !
        </Typography>

        <Link href="/">
          <Fab variant="extended" aria-label="Retour à l'accueil" color="primary">
            <KeyboardArrowLeftIcon className="mr-2" />
            <Typography variant="subtitle2">Revenir à l&apos;accueil</Typography>
          </Fab>
        </Link>
      </div>
    </>
  );
}

export const getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

Page500.suppressFirstRenderFlicker = true;
export default Page500;
