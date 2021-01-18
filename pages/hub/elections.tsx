import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"

import db, { Election, Candidate } from "db"
import PageTitle from "app/layouts/PageTitle"
import Elections from "app/components/hub/elections/Elections"
import HowItWorks from "app/components/hub/elections/HowItWorks"
import NoElections from "app/components/hub/elections/NoElections"
import { convertDatesToStrings, convertStringsToDate } from "app/utils/convertDatesToStrings"

type ElectionsIndexProps = {
  election: Election & { candidates: Candidate[] }
}

export default function ElectionsIndex({ election }: ElectionsIndexProps) {
  const elec: Election = convertStringsToDate(election)

  return (
    <>
      <PageTitle title="Élections BDE" />

      <div className="flex flex-col">
        <Typography variant="h4" paragraph align="right">
          Élections BDE
        </Typography>

        <Divider className="m-4" />

        <HowItWorks />

        {!elec ? <NoElections /> : <Elections election={election} />}
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const election = await db.election.findFirst({
    include: { candidates: true },
    where: { endDate: { gte: new Date() } },
  })

  return {
    props: { election: convertDatesToStrings(election) },
    revalidate: 1,
  }
}
