import { Head, Image } from 'blitz'
import Fab from '@mui/material/Fab'
import Typography from '@mui/material/Typography'

import ArrowLeft from '@mui/icons-material/ArrowLeftTwoTone'

import Link from 'app/core/lib/Link'
import notFound from 'public/static/images/illustrations/NotFound.svg'

function Page404() {
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
        <Image src={notFound} width={500} height={500} alt={title} quality={100} />

        <Typography variant="h4" paragraph>
          {title}
        </Typography>

        <Typography className="mb-4" variant="h6">
          T&apos;es pas là pour être ici !
        </Typography>

        <Link href="/">
          <Fab variant="extended" aria-label="Retour à l'accueil" color="primary">
            <ArrowLeft className="mr-2" color="secondary" />
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
