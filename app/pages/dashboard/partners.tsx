import { Image, BlitzPage, Routes } from 'blitz'

import Table from 'app/components/dashboard/data/Table'
import getPartners from 'app/entities/partners/queries/getPartners'
import PartnerForm from 'app/components/dashboard/partners/PartnerForm'
import upsertPartner from 'app/entities/partners/mutations/upsertPartner'
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav'
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config'
import deleteManyPartners from 'app/entities/partners/mutations/deleteManyPartners'

const Partners: BlitzPage = () => {
  return (
    <Table
      title="Partenaires"
      columns={columns}
      queryKey="partners"
      getQuery={getPartners}
      upsertQuery={upsertPartner}
      deleteQuery={deleteManyPartners}
      FormComponent={PartnerForm}
    />
  )
}

Partners.suppressFirstRenderFlicker = true
Partners.authenticate = { redirectTo: Routes.Login() }
Partners.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Partners())
Partners.getLayout = (page) => getDashboardNav(page, 'Gestion des partenaires')

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

export default Partners
