import { useQuery } from "blitz"
import { useState } from "react"

import { Election, Candidate } from "db"
import VoteDialog from "./Vote/VoteDialog"
import CandidateItem from "./CandidateItem"
import NoElections from "app/components/hub/elections/NoElections"
import getElection from "app/entities/elections/queries/getElection"

const now = new Date()

export default function Elections() {
  const [selected, setSelected] = useState<Candidate | null>(null)

  const [election] = useQuery(
    getElection,
    {
      include: { candidates: { orderBy: { name: "asc" } } },
      where: { endDate: { gte: now } },
    },
    { refetchOnWindowFocus: false }
  )

  const onSelect = (value) => () => setSelected(value)

  return (
    <>
      {!election && <NoElections />}

      {election &&
        (election as Election & { candidates: Candidate[] }).candidates.map((c, cIdx) => (
          <CandidateItem key={cIdx} candidate={c} onSelect={onSelect} />
        ))}

      <VoteDialog candidate={selected} onClose={onSelect(null)} />
    </>
  )
}
