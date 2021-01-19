import { Suspense } from "react"
import { useTheme } from "@material-ui/core"
import Divider from "@material-ui/core/Divider"
import ImageList from "@material-ui/core/ImageList"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import PageTitle from "app/layouts/PageTitle"
import Market from "app/components/hub/market/Market"
import MarketItem from "app/components/hub/market/MarketItem"

export default function MarketIndex() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const FallbackComponent = [...Array(16).keys()].map((x) => <MarketItem key={x} isLoading />)

  return (
    <>
      <PageTitle title="Classement" />

      <div className="flex flex-col">
        <Typography variant="h4" paragraph align="right">
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
