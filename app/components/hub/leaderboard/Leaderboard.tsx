import Divider from "@material-ui/core/Divider"
import { useQuery } from "blitz"
import Skeleton from "@material-ui/core/Skeleton"
import Typography from "@material-ui/core/Typography"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import fr from "date-fns/locale/fr"

import getAnalytic from "app/entities/analytic/queries/getAnalytic"

import Records from './Records'

export default function Leaderboard() {
  const [analytic, { isFetching }] = useQuery(getAnalytic, {
    where: { tag: 'leaderboard' },
  })

  return (
    <div className="flex flex-col">
      <Typography variant="h4" paragraph align="left">
        Leaderboard
      </Typography>

      <Typography variant="caption" color="textSecondary">
          {isFetching ? <Skeleton animation="wave" width="30%" /> : `Dernière mise à jour ${formatDistanceToNow(analytic.updatedAt, { addSuffix: true, locale: fr })}`}
        </Typography>

      <Divider className="m-4" />

      <Records leaderboard={analytic} isFetching={isFetching} />
    </div>
  )
}
