import Avatar from "@material-ui/core/Avatar"

import PageTitle from "app/layouts/PageTitle"
import Table from "app/components/dashboard/data/Table"
import getPartners from "app/entities/partners/queries/getPartners"
import PartnerForm from "app/components/dashboard/partners/PartnerForm"
import upsertPartner from "app/entities/partners/mutations/upsertPartner"
import deleteManyPartners from "app/entities/partners/mutations/deleteManyPartners"

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
    id: "image",
    headerName: "Photo",
    render: (row) => <Avatar className="ml-auto" src={row.image} alt={`Photo de ${row.name}`} />,
  },
  {
    id: "name",
    headerName: "Nom",
    searchCriteria: "contains",
  },
  {
    id: "description",
    headerName: "Description",
    searchCriteria: "contains",
  },
]
