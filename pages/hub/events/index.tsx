import Image from "next/image"
import addDays from "date-fns/addDays"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import { GetStaticProps, InferGetStaticPropsType } from "next"

import db from "db"
import PageTitle from "app/layouts/PageTitle"
import Card from "app/components/hub/events/Card"
import { convertDatesToStrings, convertStringsToDate } from "app/utils/convertDatesToStrings"

const today = new Date(new Date().setHours(0, 0, 0, 0))

export default function Events({ events }: InferGetStaticPropsType<typeof getStaticProps>) {
  const evts = events.map((e) => convertStringsToDate(e) as any)

  return (
    <>
      <PageTitle title="Events ZZ" />

      <div className="flex flex-col">
        <Typography variant="h4" paragraph align="right">
          Évènements à venir
        </Typography>

        <Divider className="m-4" />

        {evts.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/static/images/illustrations/NoData.svg"
              height="auto"
              width="300"
              alt="Aucune donnée"
            />

            <Typography variant="subtitle2" gutterBottom>
              Aucun événement à venir !
            </Typography>
          </div>
        )}

        <Grid container justifyContent="flex-start">
          {evts.map((x) => (
            <Card key={x.id} event={x} />
          ))}
        </Grid>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const events = await db.event.findMany({
    where: {
      AND: [{ takes_place_at: { gte: today } }, { takes_place_at: { lte: addDays(today, 7) } }],
    },
    include: { club: true },
    orderBy: { takes_place_at: "asc" },
  })

  return {
    props: { events: events.map((e) => convertDatesToStrings(e)) },
    revalidate: 1,
  }
}
