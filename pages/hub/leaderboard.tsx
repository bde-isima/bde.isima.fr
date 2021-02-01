import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"

import PageTitle from "app/layouts/PageTitle"
import RecordsTable from "app/components/hub/leaderboard/RecordsTable"

export default function Leaderboard() {
  return (
    <>
      <PageTitle title="Classement" />

      <div className="flex flex-col">
        <Typography variant="h4" paragraph align="left" color="textPrimary">
          Classement
        </Typography>

        <Typography variant="caption" color="textSecondary">
          Le classement est mis à jour chaque heure
        </Typography>

        <Divider className="m-4" />

        <RecordsTable />
      </div>
    </>
  )
}
