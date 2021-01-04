import Avatar from "@material-ui/core/Avatar"

import PageTitle from "app/layouts/PageTitle"
import Table from "app/components/dashboard/data/Table"
import getClubs from "app/entities/clubs/queries/getClubs"
import ClubForm from "app/components/dashboard/clubs/ClubForm"
import upsertClub from "app/entities/clubs/mutations/upsertClub"
import deleteManyClubs from "app/entities/clubs/mutations/deleteManyClubs"

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
    id: "image",
    headerName: "Logo",
    render: (row) => <Avatar src={row.image} alt={`Logo du ${row.name}`} />,
  },
  {
    id: "name",
    headerName: "Name",
    searchCriteria: "contains",
  },
  {
    id: "email",
    headerName: "Email",
    searchCriteria: "contains",
  },
  {
    id: "description",
    headerName: "Description",
    searchCriteria: "contains",
  },
  {
    id: "facebook_URL",
    headerName: "Facebook",
  },
  {
    id: "twitter_URL",
    headerName: "Twitter",
  },
  {
    id: "instagram_URL",
    headerName: "Instagram",
  },
  {
    id: "custom_URL",
    headerName: "Website",
  },
]
