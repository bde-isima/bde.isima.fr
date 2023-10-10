import ButtonBase from '@mui/material/ButtonBase';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

import { useAuthenticatedSession } from '@blitzjs/auth';
import { useMutation } from '@blitzjs/rpc';

import { useMediaQuery } from 'app/core/styles/theme';
import createArticleTransaction from 'app/entities/transactions/mutations/createArticleTransaction';

import Aline from 'public/static/images/illustrations/Aline.gif';

import { isListeux } from '/workspace/app/core/utils/isListeux';

const GUTTER_SIZE = 16;

export default function Article({ user, article, onClick, style }) {
  const fullScreen = useMediaQuery('md');
  const session = useAuthenticatedSession();

  const size = fullScreen ? 40 : 50;

  const [createTransaction] = useMutation(createArticleTransaction);

  let articleImage = <Skeleton variant="rectangular" width={size} height={size} animation={false} />;

  if (isListeux(session)) {
    articleImage = <Image src={Aline} width={size} height={size} alt={`Photo ${article?.name}`} />;
  } else if (article.image) {
    articleImage = <Image src={article.image} width={size} height={size} alt={`Photo ${article?.name}`} />;
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
        {articleImage}
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
