import { useState } from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import { Candidate, Election } from 'db';

import Ballot from '@mui/icons-material/BallotTwoTone';
import HideSource from '@mui/icons-material/HideSourceTwoTone';

import { useQuery } from '@blitzjs/rpc';

import NoElections from 'app/components/hub/elections/NoElections';
import getElection from 'app/entities/elections/queries/getElection';

import CandidateItem from './CandidateItem';
import VoteDialog from './Vote/VoteDialog';

const now = new Date();

export default function Elections() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Candidate | null>();

  const [election] = useQuery(
    getElection,
    {
      include: { candidates: { orderBy: { name: 'asc' } } },
      where: { endDate: { gte: now } }
    },
    { refetchOnWindowFocus: false }
  );

  const onSelect = (open, value) => () => {
    setOpen(open);
    setSelected(value);
  };

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
                startIcon={<HideSource />}
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
  );
}
