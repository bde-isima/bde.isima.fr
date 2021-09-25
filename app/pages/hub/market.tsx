import { Suspense } from 'react'
import { useTheme } from '@mui/material'
import Divider from '@mui/material/Divider'
import ImageList from '@mui/material/ImageList'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import PageTitle from 'app/core/layouts/PageTitle'
import Market from 'app/components/hub/market/Market'
import MarketItem from 'app/components/hub/market/MarketItem'

export default function MarketIndex() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))

  const FallbackComponent = [...Array(20).keys()].map((x) => <MarketItem key={x} isLoading />)

  return (
    <>
      <PageTitle title="Classement" />

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
    </>
  )
}
