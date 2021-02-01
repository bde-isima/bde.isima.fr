import Image from "next/image"
import { useMutation } from "blitz"
import { useTheme } from "@material-ui/core"
import Skeleton from "@material-ui/core/Skeleton"
import ButtonBase from "@material-ui/core/ButtonBase"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import createArticleTransaction from "app/entities/transactions/mutations/createArticleTransaction"

const GUTTER_SIZE = 16

export default function Article({ user, article, onClick, style }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  const size = fullScreen ? 40 : 50

  const [createTransaction] = useMutation(createArticleTransaction)

  const onTransaction = () => {
    onClick(() =>
      createTransaction({
        data: {
          userId: user?.id,
          articleId: article?.id,
          description: `Achat ${article?.name}`,
        },
      })
    )
  }

  return (
    <div
      className="overflow-hidden"
      style={{
        ...style,
        left: style.left + GUTTER_SIZE,
        top: style.top + GUTTER_SIZE,
        width: style.width - GUTTER_SIZE,
        height: style.height - GUTTER_SIZE,
      }}
    >
      <ButtonBase className="flex flex-col w-full h-full" onClick={onTransaction}>
        {article.image ? (
          <Image src={article.image} width={size} height={size} alt={`Photo ${article?.name}`} />
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
  )
}
