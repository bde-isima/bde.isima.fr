import Grid from "@material-ui/core/Grid"
import { Fragment, useState } from "react"
import Typography from "@material-ui/core/Typography"

import { Election, Candidate } from "db"
import VoteDialog from "./Vote/VoteDialog"
import CandidateCard from "./CandidateCard"

type ElectionsProps = {
  election: Election & { candidates: Candidate[] }
}

export default function Elections({ election }: ElectionsProps) {
  const [selected, setSelected] = useState<Candidate | null>(null)

  const onSelect = (value) => () => setSelected(value)

  return (
    <Grid container className="flex flex-col md:flex-row items-center">
      {election.candidates.map((c, cIdx) => (
        <Fragment key={cIdx}>
          <Grid item xs={12} md={5}>
            <CandidateCard candidate={c} onSelect={onSelect} />
          </Grid>
          {cIdx < election.candidates.length - 1 && (
            <Grid container item xs={12} md justifyContent="center">
              <Typography className="m-12" variant="h2" color="primary">
                <i>
                  <b>OU</b>
                </i>
              </Typography>
            </Grid>
          )}
        </Fragment>
      ))}

      <VoteDialog candidate={selected} onClose={onSelect(null)} />
    </Grid>
  )
}
