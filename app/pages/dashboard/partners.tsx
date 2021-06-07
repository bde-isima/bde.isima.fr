import Image from 'next/image'

import PageTitle from 'app/core/layouts/PageTitle'
import Table from 'app/components/dashboard/data/Table'
import getPartners from 'app/entities/partners/queries/getPartners'
import PartnerForm from 'app/components/dashboard/partners/PartnerForm'
import upsertPartner from 'app/entities/partners/mutations/upsertPartner'
import deleteManyPartners from 'app/entities/partners/mutations/deleteManyPartners'

export default function Partners() {
  return (
    <>
      <PageTitle title="Gestion des partenaires" />

      <Table
        title="Partenaires"
        columns={columns}
        queryKey="partners"
        getQuery={getPartners}
        upsertQuery={upsertPartner}
        deleteQuery={deleteManyPartners}
        FormComponent={PartnerForm}
      />
    </>
  )
}

const columns = [
  {
    id: 'image',
    headerName: 'Photo',
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
    headerName: 'Nom',
    searchCriteria: 'contains',
  },
  {
    id: 'description',
    headerName: 'Description',
    searchCriteria: 'contains',
  },
]
