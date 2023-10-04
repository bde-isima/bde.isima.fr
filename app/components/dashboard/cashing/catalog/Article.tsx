import ButtonBase from '@mui/material/ButtonBase';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { isListeux } from '/workspace/app/core/utils/isListeux'

import Image, { StaticImageData } from 'next/image';
import Aline from 'public/static/images/illustrations/Aline.gif'

import { useAuthenticatedSession } from '@blitzjs/auth';
import { useMutation } from '@blitzjs/rpc';

import { useMediaQuery } from 'app/core/styles/theme';
import createArticleTransaction from 'app/entities/transactions/mutations/createArticleTransaction';

const GUTTER_SIZE = 16;

export default function Article({ user, article, onClick, style }) {
  const fullScreen = useMediaQuery('md');
  const session = useAuthenticatedSession();

  const size = fullScreen ? 40 : 50;

  const [createTransaction] = useMutation(createArticleTransaction);

  function loadImageSrc(): StaticImageData {
    if (isListeux(session)) {
      return Aline;
    } else {
      return article.image;
    }
  }

  const onTransaction = () => {
    onClick(() =>
      createTransaction({
        data: {
          userId: user?.id,
          articleId: article?.id,
          description: `Achat ${article?.name}`
        }
      })
    );
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        ...style,
        left: style.left + GUTTER_SIZE,
        top: style.top + GUTTER_SIZE,
        width: style.width - GUTTER_SIZE,
        height: style.height - GUTTER_SIZE
      }}
    >
      <ButtonBase className="flex flex-col w-full h-full" onClick={onTransaction}>
        {article.image ? (
          <Image src={loadImageSrc()} width={size} height={size} alt={`Photo ${article?.name}`} />
        ) : (
          <Skeleton variant="rectangular" width={size} height={size} animation={false} />
        )}
        <Typography variant="caption" color="inherit" noWrap>
          {article?.name}
        </Typography>
        <Typography variant="caption" color="inherit" noWrap>
          {`${user?.is_member ? article?.member_price : article?.price} €`}
        </Typography>
      </ButtonBase>
    </div>
  );
}
