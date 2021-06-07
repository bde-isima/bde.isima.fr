import Image from 'next/image'

import PageTitle from 'app/core/layouts/PageTitle'
import Table from 'app/components/dashboard/data/Table'
import getClubs from 'app/entities/clubs/queries/getClubs'
import ClubForm from 'app/components/dashboard/clubs/ClubForm'
import upsertClub from 'app/entities/clubs/mutations/upsertClub'
import deleteManyClubs from 'app/entities/clubs/mutations/deleteManyClubs'

export default function Clubs() {
  return (
    <>
      <PageTitle title="Gestion des clubs" />

      <Table
        title="Clubs"
        columns={columns}
        queryKey="clubs"
        getQuery={getClubs}
        upsertQuery={upsertClub}
        deleteQuery={deleteManyClubs}
        FormComponent={ClubForm}
      />
    </>
  )
}

const columns = [
  {
    id: 'image',
    headerName: 'Logo',
    render: (row) =>
      row.image && (
        <Image
          className="ml-auto rounded-full"
          src={row.image}
          width={40}
          height={40}
          alt={`Photo de ${row.name}`}
        />
      ),
  },
  {
    id: 'name',
    headerName: 'Name',
    searchCriteria: 'contains',
    format: (value) => (value ? value.toLowerCase() : value),
  },
  {
    id: 'email',
    headerName: 'Email',
    searchCriteria: 'contains',
  },
]
