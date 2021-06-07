import Image from 'next/image'
import Skeleton from '@material-ui/core/Skeleton'
import ImageListItem from '@material-ui/core/ImageListItem'
import ImageListItemBar from '@material-ui/core/ImageListItemBar'

import { Article } from 'db'

type MarketItemProps = {
  article?: Article | null
  isLoading?: boolean
}

export default function MarketItem({ article, isLoading }: MarketItemProps) {
  return (
    <ImageListItem>
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
      ) : (
        <Image
          className="rounded-lg"
          src={article?.image!}
          layout="fill"
          objectFit="cover"
          alt={article?.name}
        />
      )}
      <ImageListItemBar
        className="rounded-b-lg"
        title={
          isLoading ? (
            <Skeleton width="100%" animation="wave" />
          ) : (
            `${article?.name} • ${article?.member_price.toFixed(2)}€`
          )
        }
        subtitle={
          isLoading ? (
            <Skeleton width="100%" animation="wave" />
          ) : (
            `Non-cotisant • ${article?.price.toFixed(2)}€`
          )
        }
      />
    </ImageListItem>
  )
}
