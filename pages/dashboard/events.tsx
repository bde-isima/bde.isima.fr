import { format } from "date-fns"
import { useMutation, invalidateQuery } from "blitz"

import Check from "mdi-material-ui/Check"
import CurrencyUsd from "mdi-material-ui/CurrencyUsd"

import Snackbar from "app/layouts/Snackbar"
import PageTitle from "app/layouts/PageTitle"
import useSnackbar from "app/hooks/useSnackbar"
import Table from "app/components/dashboard/data/Table"
import getEvents from "app/entities/events/queries/getEvents"
import upsertEvent from "app/entities/events/mutations/upsertEvent"
import updateEvent from "app/entities/events/mutations/updateEvent"
import EventStatus from "app/components/dashboard/events/EventStatus"
import checkoutEvent from "app/entities/events/mutations/checkoutEvent"
import deleteManyEvents from "app/entities/events/mutations/deleteManyEvents"

const today = new Date()

export default function Events() {
  const { open, message, severity, onShow, onClose } = useSnackbar()

  const [updateEvnt] = useMutation(updateEvent)
  const [checkoutEvnt] = useMutation(checkoutEvent)

  const approve = (rowData) => () => {
    return updateEvnt({ where: { id: rowData.id }, data: { status: "ACCEPTED" } })
      .then(() => {
        onShow("success", "Approuvé")
        invalidateQuery(getEvents)
      })
      .catch((err) => onShow("error", err.message))
  }

  const checkout = (rowData) => () => {
    return checkoutEvnt({ where: { id: rowData.id } })
      .then(() => {
        onShow("success", "Encaissé")
        invalidateQuery(getEvents)
      })
      .catch((err) => onShow("error", err.message))
  }

  return (
    <>
      <PageTitle title="Gestion des événements" />

      <Table
        title="Événements"
        columns={columns}
        queryKey="events"
        getQuery={getEvents}
        queryArgs={{
          where: {
            OR: [
              {
                status: { in: ["WAITING_APPROVAL"] },
              },
              {
                status: { in: ["ACCEPTED"] },
                takes_place_at: { lte: today },
              },
            ],
          },
        }}
        upsertQuery={upsertEvent}
        deleteQuery={deleteManyEvents}
        actions={[
          (rowData) => ({
            icon: <Check />,
            tooltip: "Valider",
            onClick: approve,
            disabled: rowData.status !== "WAITING_APPROVAL",
          }),
          (rowData) => ({
            icon: <CurrencyUsd />,
            tooltip: "Encaisser",
            onClick: checkout,
            disabled:
              rowData.status !== "ACCEPTED" || new Date() < new Date(rowData.subscriptions_end_at),
          }),
        ]}
      />

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </>
  )
}

const columns = [
  {
    id: "name",
    headerName: "Name",
    searchCriteria: "contains",
  },
  {
    id: "description",
    headerName: "Description",
    searchCriteria: "contains",
  },
  {
    id: "takes_place_at",
    headerName: "Date de l'événement",
    render: (row) => format(row.takes_place_at, "dd/MM/yyyy - HH:mm"),
  },
  {
    id: "subscriptions_end_at",
    headerName: "Date limite d'inscription",
    render: (row) => format(row.subscriptions_end_at, "dd/MM/yyyy - HH:mm"),
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
