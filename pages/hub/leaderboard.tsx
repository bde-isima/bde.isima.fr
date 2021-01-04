import fr from "date-fns/locale/fr"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { GetStaticProps, InferGetStaticPropsType } from "next"

import db from "db"
import PageTitle from "app/layouts/PageTitle"
import Records from "app/components/hub/leaderboard/Records"

export default function Leaderboard({ analytic }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageTitle title="Classement" />

      <div className="flex flex-col">
        <Typography variant="h4" paragraph align="left">
          Classement
        </Typography>

        <Typography variant="caption" color="textSecondary">
          Dernière mise à jour{" "}
          {formatDistanceToNow(analytic.updatedAt, { addSuffix: true, locale: fr })}
        </Typography>

        <Divider className="m-4" />

        <Records leaderboard={analytic} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const analytic = await db.analytic.findUnique({
    where: { tag: "leaderboard" },
  })

  return {
    props: { analytic },
    revalidate: 1,
  }
}
