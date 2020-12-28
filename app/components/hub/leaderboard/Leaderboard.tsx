import Divider from "@material-ui/core/Divider"
import Skeleton from "@material-ui/core/Skeleton"
import Typography from "@material-ui/core/Typography"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import fr from "date-fns/locale/fr"

//import Records from './Records'

export default function Leaderboard() {
  //const [{ leaderboard }, { isFetching }] = useQuery(getLeaderboard)

  return (
    <div className="flex flex-col">
      <Typography variant="h4" paragraph align="left">
        Leaderboard
      </Typography>

      {true ? (
        <Typography variant="caption" color="textSecondary">
          Dernière mise à jour {formatDistanceToNow(new Date(), { addSuffix: true, locale: fr })}
        </Typography>
      ) : (
        <Skeleton height={12} width="20%" />
      )}

      <Divider className="m-4" />

      {/**<Records analytics={leaderboard} isLoading={!isResolved} classes={classes} /> */}
    </div>
  )
}
