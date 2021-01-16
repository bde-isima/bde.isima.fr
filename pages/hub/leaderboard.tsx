import fr from "date-fns/locale/fr"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import db, { Analytic } from "db"
import PageTitle from "app/layouts/PageTitle"
import RecordsTable from "app/components/hub/leaderboard/RecordsTable"
import { convertDatesToStrings, convertStringsToDate } from "app/utils/convertDatesToStrings"

type LeaderboardProps = {
  analytic: Analytic
}

export default function Leaderboard({ analytic }: LeaderboardProps) {
  const anltc: Analytic = convertStringsToDate(analytic)

  return (
    <>
      <PageTitle title="Classement" />

      <div className="flex flex-col">
        <Typography variant="h4" paragraph align="left">
          Classement
        </Typography>

        <Typography variant="caption" color="textSecondary">
          Dernière mise à jour{" "}
          {formatDistanceToNow(anltc.updatedAt, { addSuffix: true, locale: fr })}
        </Typography>

        <Divider className="m-4" />

        <RecordsTable leaderboard={anltc} />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const analytic = await db.analytic.findUnique({
    where: { tag: "leaderboard" },
  })

  if (!analytic) {
    return {
      notFound: true,
    }
  }

  return {
    props: { analytic: convertDatesToStrings(analytic) },
    revalidate: 1,
  }
}
