import { Image, useMutation } from 'blitz';
import Skeleton from '@material-ui/core/Skeleton'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

import createArticleTransaction from 'app/entities/transactions/mutations/createArticleTransaction'

const GUTTER_SIZE = 16

export default function Article({ user, article, isFetching, onClick, style }) {
    const [createTransaction] = useMutation(createArticleTransaction)

    const onTransaction = () => {
        onClick(() => createTransaction({
            data: {
                description: `Achat ${article?.name}`,
                article: { connect: { id: article?.id } },
                user: { connect: { id: user?.id } },
            }
        }), article)
    }

    return (
        <div
            style={{
                ...style,
                top: style.top + GUTTER_SIZE,
                height: style.height - GUTTER_SIZE,
            }}
        >
            <ButtonBase className="flex flex-col w-full h-full" onClick={onTransaction}>
                {isFetching ? (
                    <Skeleton variant="rectangular" animation="wave" width={50} height={50} />
                ) : (
                    <Image src={article?.image} width={50} height={50} alt={`Photo ${article?.name}`} />
                )}
                <Typography variant="caption" color="inherit" noWrap>
                    {isFetching ? <Skeleton animation="wave" width={50} /> : article?.name}
                </Typography>
                <Typography variant="caption" color="inherit" noWrap>
                    {isFetching ? <Skeleton animation="wave" width={50} /> : `${user?.is_member ? article?.member_price : article?.price} €`}
                </Typography>
            </ButtonBase>
        </div>
    )
}