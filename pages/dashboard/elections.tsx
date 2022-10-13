import { useState } from 'react';

import cuid from 'cuid';
import { format } from 'date-fns';
import { Vote } from 'db';
import { CsvBuilder } from 'filefy';

import Visibility from '@mui/icons-material/VisibilityTwoTone';

import { BlitzPage, Routes } from '@blitzjs/next';
import { invoke } from '@blitzjs/rpc';

import Table from 'app/components/dashboard/data/Table';
import ElectionForm from 'app/components/dashboard/elections/ElectionForm';
import Results from 'app/components/dashboard/elections/Results';
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';
import deleteManyElections from 'app/entities/elections/mutations/deleteManyElections';
import upsertElection from 'app/entities/elections/mutations/upsertElection';
import getElections from 'app/entities/elections/queries/getElections';
import getResults from 'app/entities/elections/queries/getResults';
import getVoteRequests from 'app/entities/voteRequests/queries/getVoteRequests';

const Elections: BlitzPage = () => {
  const [results, setResults] = useState<Vote[] | null>(null);

  const seeResults = (rowData) => () => async () => {
    const results = await invoke(getResults, { where: { id: rowData.id } });
    setResults(results);
  };

  const resetResult = () => setResults(null);

  const exportCsv = async (rowData) => {
    const { voteRequests } = await invoke(getVoteRequests, {
      where: { electionId: rowData.id },
      include: { user: true }
    });

    new CsvBuilder('campagnes.csv')
      .setDelimeter(',')
      .setColumns(['firstname', 'lastname', 'email', 'voteToken'])
      .addRows(voteRequests.map((v: any) => [v.user.firstname, v.user.lastname, v.user.email, v.voteToken]))
      .exportFile();
  };

  return (
    <>
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
            icon: <Visibility />,
            tooltip: 'Réveler les résultats',
            onClick: seeResults(rowData)
          })
        ]}
      />

      <Results results={results} onClose={resetResult} />
    </>
  );
};

Elections.suppressFirstRenderFlicker = true;
Elections.authenticate = { redirectTo: Routes.Login() };
Elections.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Elections());
Elections.getLayout = (page) => getDashboardNav(page, 'Gestion des campagnes');

const columns = [
  {
    id: 'candidates',
    headerName: 'Candidats',
    render: (row) => row.candidates.map((x) => x.name).join(', '),
    format: (value) => ({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      connectOrCreate: value.map(({ id, electionId, ...v }) => ({
        create: { ...v },
        where: { id: id ?? cuid() }
      }))
    })
  },
  {
    id: 'endDate',
    headerName: 'Date de fin',
    render: (row) => format(row.endDate, 'dd/MM/yyyy - HH:mm')
  }
];

export default Elections;
