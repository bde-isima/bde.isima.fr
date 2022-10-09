import Head from 'next/head'
import Image from 'next/image'
import Fab from '@mui/material/Fab'
import Typography from '@mui/material/Typography'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeftTwoTone'

import Link from 'app/core/lib/Link'

function Page404() {
  const title = '404: Page non trouvée'

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="flex flex-col min-h-main justify-center items-center">
        <Image
          src="/static/images/illustrations/NotFound.svg"
          width={500}
          height={500}
          alt={title}
          quality={100}
        />

        <Typography variant="h4" paragraph color="textPrimary">
          {title}
        </Typography>

        <Typography className="mb-4" variant="h6" color="textPrimary">
          T&apos;es pas là pour être ici !
        </Typography>

        <Link href="/">
          <Fab variant="extended" aria-label="Retour à l'accueil" color="primary">
            <KeyboardArrowLeftIcon className="mr-2" color="secondary" />
            <Typography variant="subtitle2" color="secondary">
              Revenir à l&apos;accueil
            </Typography>
          </Fab>
        </Link>
      </div>
    </>
  )
}

Page404.suppressFirstRenderFlicker = true
export default Page404
