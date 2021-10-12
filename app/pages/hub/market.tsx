import { Suspense } from 'react'
import { BlitzPage, Routes } from 'blitz'
import Divider from '@mui/material/Divider'
import ImageList from '@mui/material/ImageList'
import Typography from '@mui/material/Typography'

import { useMediaQuery } from 'app/core/styles/theme'
import Market from 'app/components/hub/market/Market'
import getHubNav from 'app/components/nav/hub/getHubNav'
import MarketItem from 'app/components/hub/market/MarketItem'

const MarketIndex: BlitzPage = () => {
  const fullScreen = useMediaQuery('md')

  const FallbackComponent = [...Array(20).keys()].map((x) => <MarketItem key={x} isLoading />)

  return (
    <div className="flex flex-col">
      <Typography variant="h4" paragraph align="right" color="textPrimary">
        Articles disponibles au BDE
      </Typography>

      <Divider className="m-4" />

      <ImageList cols={fullScreen ? 2 : 5} rowHeight={200} gap={16}>
        <Suspense fallback={FallbackComponent}>
          <Market />
        </Suspense>
      </ImageList>
    </div>
  )
}

MarketIndex.suppressFirstRenderFlicker = true
MarketIndex.authenticate = { redirectTo: Routes.Login() }
MarketIndex.getLayout = (page) => getHubNav(page, 'Marché ZZ')

export default MarketIndex
