import Avatar from "@material-ui/core/Avatar"

import Table from "../data/Table"
import PartnerForm from "./PartnerForm"
import getPartners from "app/entities/partners/queries/getPartners"
import upsertPartner from "app/entities/partners/mutations/upsertPartner"
import deleteManyPartners from "app/entities/partners/mutations/deleteManyPartners"

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

export default function PartnersTable() {
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
