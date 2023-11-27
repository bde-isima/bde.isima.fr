import ButtonBase from '@mui/material/ButtonBase';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

import { useAuthenticatedSession } from '@blitzjs/auth';
import { useMutation } from '@blitzjs/rpc';

import { useMediaQuery } from 'app/core/styles/theme';
import createArticleTransaction from 'app/entities/transactions/mutations/createArticleTransaction';

import Aline from 'public/static/images/illustrations/Aline.gif';

import { isTroll } from 'app/core/utils/listeux_or_troll';

const GUTTER_SIZE = 16;

export default function Article({ user, article, onClick, style }) {
  const fullScreen = useMediaQuery('md');
  const session = useAuthenticatedSession();

  const size = fullScreen ? 40 : 50;

  const [createTransaction] = useMutation(createArticleTransaction);

  let articleImage = <Skeleton variant="rectangular" width={size} height={size} animation={false} />;
  let articleName = '';

  if (isTroll(session)) {
    articleImage = <Image src={Aline} width={size} height={size} alt={`Photo ${article?.name}`} />;
    articleName = mixLetters(article?.name);
  } else if (article.image) {
    articleImage = <Image src={article.image} width={size} height={size} alt={`Photo ${article?.name}`} />;
    articleName = article?.name;
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

  function mixLetters(str: string): string {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

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
          {articleName}
        </Typography>
        <Typography variant="caption" color="inherit" noWrap>
          {`${user?.is_member ? article?.member_price : article?.price} €`}
        </Typography>
      </ButtonBase>
    </div>
  );
}
