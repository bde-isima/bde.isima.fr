import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'

import ArrowLeft from 'mdi-material-ui/ArrowLeft'

export default function Page404() {
  const statusCode = 404
  const title = 'Page non trouvée'

  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>

      <div className="flex flex-col min-h-main justify-center items-center">
        <Image
          src="/static/images/illustrations/NotFound.svg"
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
          T'es pas là pour être ici !
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
