import { useQuery } from 'blitz'
import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import Null from 'mdi-material-ui/Null'
import Ballot from 'mdi-material-ui/Ballot'

import { Election, Candidate } from 'db'
import VoteDialog from './Vote/VoteDialog'
import CandidateItem from './CandidateItem'
import NoElections from 'app/components/hub/elections/NoElections'
import getElection from 'app/entities/elections/queries/getElection'

const now = new Date()

export default function Elections() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Candidate | null>()

  const [election] = useQuery(
    getElection,
    {
      include: { candidates: { orderBy: { name: 'asc' } } },
      where: { endDate: { gte: now } },
    },
    { refetchOnWindowFocus: false }
  )

  const onSelect = (open, value) => () => {
    setOpen(open)
    setSelected(value)
  }

  return (
    <>
      {!election && <NoElections />}

      {election && (
        <>
          {(election as Election & { candidates: Candidate[] }).candidates.map((c, cIdx) => (
            <CandidateItem key={cIdx} candidate={c} onSelect={onSelect} />
          ))}

          <Grid container xs={12} item justifyContent="center">
            <ButtonGroup variant="outlined" color="primary">
              <Button
                className="w-32 md:w-52"
                startIcon={<Ballot />}
                onClick={onSelect(true, undefined)}
                color="inherit"
              >
                Vote Blanc
              </Button>
              <Button
                className="w-32 md:w-52"
                startIcon={<Null />}
                onClick={onSelect(true, null)}
                color="inherit"
              >
                Vote Nul
              </Button>
            </ButtonGroup>
          </Grid>

          <VoteDialog open={open} candidate={selected} onClose={onSelect(undefined, false)} />
        </>
      )}
    </>
  )
}
