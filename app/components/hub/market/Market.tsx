import { useQuery } from "blitz"
import { useTheme } from '@material-ui/core'
import Divider from "@material-ui/core/Divider"
import Skeleton from "@material-ui/core/Skeleton"
import ImageList from '@material-ui/core/ImageList'
import Typography from "@material-ui/core/Typography"
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ImageListItem from '@material-ui/core/ImageListItem'
import ImageListItemBar from '@material-ui/core/ImageListItemBar'

import getArticles from "app/entities/articles/queries/getArticles"

export default function Market() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [{ articles }, { isFetching }] = useQuery(getArticles, {
    where: { is_enabled: true },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div className="flex flex-col">
      <Typography variant="h4" paragraph align="right">
        Articles disponibles au BDE
      </Typography>

      <Divider className="m-4" />

      <ImageList cols={fullScreen ? 2 : 5} gap={16}>
        {articles.map((article, idx) => (
          <ImageListItem key={idx}>
            <img src={article.image} alt={article.name} />
            <ImageListItemBar 
              position="below" 
              title={
                isFetching ? (
                  <Skeleton animation="wave" width="80%" />
                ) : (
                  `${article.name} • ${article.member_price}€`
                )
              }
              subtitle={
                isFetching ? (
                  <Skeleton animation="wave" width="40%" />
                ) : (
                  `Non-cotisant • ${article.price}€`
                )
              } 
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}
