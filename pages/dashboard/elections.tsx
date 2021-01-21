import cuid from "cuid"
import { useState } from "react"
import { format } from "date-fns"
import { CsvBuilder } from "filefy"
import { useMutation } from "blitz"

import Eye from "mdi-material-ui/Eye"

import { Vote } from "db"
import Snackbar from "app/layouts/Snackbar"
import PageTitle from "app/layouts/PageTitle"
import useSnackbar from "app/hooks/useSnackbar"
import Table from "app/components/dashboard/data/Table"
import Results from "app/components/dashboard/elections/Results"
import getResults from "app/entities/elections/queries/getResults"
import getElections from "app/entities/elections/queries/getElections"
import ElectionForm from "app/components/dashboard/elections/ElectionForm"
import upsertElection from "app/entities/elections/mutations/upsertElection"
import deleteManyElections from "app/entities/elections/mutations/deleteManyElections"
import getVoteRequests from "app/entities/voteRequests/queries/getVoteRequests"

export default function Elections() {
  const { open, message, severity, onShow, onClose } = useSnackbar()
  const [results, setResults] = useState<Vote[] | null>(null)
  const [getRslt] = useMutation(getResults)
  const [getRequests] = useMutation(getVoteRequests)

  const seeResults = (rowData) => () => () => {
    return getRslt({ where: { id: rowData.id } })
      .then((res: any) => setResults(res))
      .catch((err) => onShow("error", err.message))
  }

  const exportCsv = (rowData) => {
    getRequests({
      where: { electionId: rowData.id },
      include: { user: true },
    }).then(({ voteRequests }) =>
      new CsvBuilder("campagnes.csv")
        .setDelimeter(",")
        .setColumns(["firstname", "lastname", "voteToken"])
        .addRows(voteRequests.map((v: any) => [v.user.firstname, v.user.lastname, v.voteToken]))
        .exportFile()
    )
  }

  const resetResult = () => setResults(null)

  return (
    <>
      <PageTitle title="Gestion des campagnes" />

      <Table
        title="Campagnes"
        columns={columns}
        queryKey="elections"
        getQuery={getElections}
        queryArgs={{ include: { candidates: true } }}
        upsertQuery={upsertElection}
        deleteQuery={deleteManyElections}
        FormComponent={ElectionForm}
        onExport={exportCsv}
        actions={[
          (rowData) => ({
            icon: <Eye />,
            tooltip: "Réveler les résultats",
            onClick: seeResults(rowData),
          }),
        ]}
      />

      <Results results={results} onClose={resetResult} />

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </>
  )
}

const columns = [
  {
    id: "candidates",
    headerName: "Candidats",
    render: (row) => row.candidates.map((x) => x.name).join(", "),
    format: (value) => ({
      connectOrCreate: value.map(({ id, electionId, ...v }) => ({
        create: { ...v },
        where: { id: id ?? cuid() },
      })),
    }),
  },
  {
    id: "endDate",
    headerName: "Date de fin",
    render: (row) => format(row.endDate, "dd/MM/yyyy - HH:mm"),
  },
]
