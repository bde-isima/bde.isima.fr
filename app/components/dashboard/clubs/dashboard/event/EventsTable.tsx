import { useState } from 'react'
import { format } from "date-fns"

import ViewDashboardVariant from "mdi-material-ui/ViewDashboardVariant"

import EventForm from "./EventForm"
import Manager from './manager/Manager'
import Table from "app/components/dashboard/data/Table"
import getEvents from "app/entities/events/queries/getEvents"
import upsertEvent from "app/entities/events/mutations/upsertEvent"
import EventStatus from "app/components/dashboard/events/EventStatus"
import deleteManyEvents from "app/entities/events/mutations/deleteManyEvents"

const columns = [
  {
    id: "name",
    headerName: "Name",
    searchCriteria: "contains",
  },
  {
    id: "takes_place_at",
    headerName: "Date de l'événement",
    render: (row) => format(row.takes_place_at, "dd/MM/yyyy - hh:mm"),
  },
  {
    id: "subscriptions_end_at",
    headerName: "Date limite d'inscription",
    render: (row) => format(row.subscriptions_end_at, "dd/MM/yyyy - hh:mm"),
  },
  {
    id: "status",
    headerName: "Statut",
    searchCriteria: "contains",
    render: (row) => <EventStatus event={row} />,
  },
  {
    id: "max_subscribers",
    headerName: "Nombre max de participants",
  },
]

export default function EventsTable({ club }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const manage = rowData => () => () => {
    setOpen(true)
    setSelected(rowData)
  }

  const onClose = () => setOpen(false) 

  return (
    <>
      <Table
        title="Événements"
        columns={columns}
        variant="outlined"
        queryKey="events"
        getQuery={getEvents}
        queryArgs={{ where: { clubId: club.id } }}
        upsertQuery={upsertEvent}
        deleteQuery={deleteManyEvents}
        FormComponent={EventForm}
        actions={[
          (rowData) => ({
            icon: <ViewDashboardVariant />,
            tooltip: "Gérer",
            onClick: manage(rowData),
          }),
        ]}
      />

      <Manager open={open} event={selected} onClose={onClose} />
    </>
  )
}
