import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Skeleton from '@mui/material/Skeleton';
import { Article } from 'db';

import Image from 'next/image';

type MarketItemProps = {
  article?: Article | null;
  isLoading?: boolean;
  member?: boolean;
};

export default function MarketItem({ article, isLoading, member }: MarketItemProps) {
  return (
    <ImageListItem>
      {isLoading || article?.image == null ? (
        <Skeleton className="rounded-lg" variant="rectangular" width="100%" height={200} animation="wave" />
      ) : (
        <Image className="rounded-lg" src={article?.image!} layout="fill" objectFit="cover" alt={article?.name} />
      )}
      <ImageListItemBar
        className="rounded-b-lg backdrop-blur-lg"
        title={
          isLoading ? (
            <Skeleton width="100%" animation="wave" />
          ) : (
            `${article?.name} • ${member ? article?.member_price.toFixed(2) : article?.price.toFixed(2)}€`
          )
        }
        subtitle={
          isLoading ? (
            <Skeleton width="100%" animation="wave" />
          ) : member ? (
            `Non-cotisant • ${article?.price.toFixed(2)}€`
          ) : (
            `Cotisant • ${article?.member_price.toFixed(2)}€`
          )
        }
      />
    </ImageListItem>
  );
}
