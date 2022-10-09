import Image from 'next/image'
import Divider from '@mui/material/Divider'
import ImageList from '@mui/material/ImageList'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'

import OpenInNew from '@mui/icons-material/OpenInNewTwoTone'

import Link from 'app/core/lib/Link'
import github from 'public/static/images/previews/github.png'
import githubIcon from 'public/static/images/logos/github.png'

export default function News() {
  const openNewWindow = (url: string) => () => window.open(url, '_blank noreferrer noopener')

  return (
    <div className="flex flex-col">
      <Typography align="left" variant="h6" color="textPrimary">
        Actualités
      </Typography>

      <Divider className="m-4" />

      <ImageList className="grid grid-cols-1 mx-4" sx={{ transform: 'translateZ(0)' }} gap={16}>
        <ImageListItem
          className="group flex justify-center items-center drop-shadow-xl rounded-2xl xyz-in hover:cursor-pointer h-64"
          onClick={openNewWindow('https://github.com/bde-isima/bde.isima.fr')}
        >
          <Image
            className="rounded-2xl border-solid border-[1px] border-gray-300"
            src={github}
            alt="Coup de neuf pour le site"
            placeholder="blur"
            layout="fill"
            objectFit="cover"
          />

          <ImageListItemBar
            sx={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
            }}
            className="transition-opacity duration-500 opacity-0 group-hover:opacity-100 rounded-b-2xl"
            title={
              <div className="flex items-center">
                <Image src={githubIcon} alt="Coup de neuf pour le site" />
                <Typography className="ml-4">Coup de neuf pour le site</Typography>
              </div>
            }
            actionIcon={
              <IconButton
                className="bg-gray-700/40 text-white m-2"
                LinkComponent={Link}
                href="https://www.tictactrip.eu/?partnerId=WB-ASSO-ISIMA-CLERMONT"
                target="_blank noreferrer noopener"
                aria-label="Lien vers Tictactrip"
                size="large"
              >
                <OpenInNew />
              </IconButton>
            }
          />
        </ImageListItem>
      </ImageList>
    </div>
  )
}
