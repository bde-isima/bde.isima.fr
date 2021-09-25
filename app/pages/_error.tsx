import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Fab from '@mui/material/Fab'
import Typography from '@mui/material/Typography'

import ArrowLeft from 'mdi-material-ui/ArrowLeft'

export default function Error({ statusCode }) {
  const errorCode = 500
  const title = "Oops, quelque chose s'est mal passé"

  return (
    <>
      <Head>
        <title>
          {errorCode}: ({statusCode ? 'server' : 'client'}) {title}
        </title>
      </Head>

      <div className="flex flex-col min-h-main justify-center items-center">
        <Image
          src="/static/images/illustrations/ServerError.svg"
          alt={title}
          width={500}
          height={500}
          layout="intrinsic"
          objectFit="cover"
        />

        <Typography variant="h4" paragraph>
          {title}
        </Typography>

        <Typography className="mb-4" variant="h6">
          T'étais pas censé être là pour être ici ! Désolé !
        </Typography>

        <Link href="/">
          <Fab variant="extended" aria-label="Retour à l'accueil" color="primary">
            <ArrowLeft className="mr-2" color="secondary" />
            <Typography variant="subtitle2" color="secondary">
              Revenir à l'accueil
            </Typography>
          </Fab>
        </Link>
      </div>
    </>
  )
}

export const getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
