import { format } from "date-fns"
import { useMutation } from "blitz"
import { SyntheticEvent } from "react"

import Check from "mdi-material-ui/Check"
import CurrencyUsd from "mdi-material-ui/CurrencyUsd"

import Table from "../data/Table"
import EventForm from "./EventForm"
import EventStatus from "./EventStatus"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import getEvents from "app/entities/events/queries/getEvents"
import updateEvent from "app/entities/events/mutations/updateEvent"
import upsertEvent from "app/entities/events/mutations/upsertEvent"
import checkoutEvent from "app/entities/events/mutations/checkoutEvent"
import deleteManyEvents from "app/entities/events/mutations/deleteManyEvents"

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

const today = new Date(new Date().setHours(0, 0, 0, 0))

export default function EventsTable() {
  const [updateEvnt] = useMutation(updateEvent)
  const [checkoutEvnt] = useMutation(checkoutEvent)

  const { open, message, severity } = useSnackbar()

  const approve = (rowData) => () => {
    return updateEvnt({
      where: { id: rowData.id },
      data: { status: "ACCEPTED" },
    })
      .then(() => {
        message.set("Approuvé")
        severity.set("success")
      })
      .catch((err) => {
        message.set(err.message)
        severity.set("error")
      })
      .finally(() => open.set(true))
  }

  const checkout = (rowData) => () => {
    return checkoutEvnt({ where: { id: rowData.id } })
      .then(() => {
        message.set("Encaissé")
        severity.set("success")
      })
      .catch((err) => {
        message.set(err.message)
        severity.set("error")
      })
      .finally(() => open.set(true))
  }

  const onSnackClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") return
    open.set(false)
  }

  return (
    <>
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
        FormComponent={EventForm}
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
            disabled: rowData.status !== "ACCEPTED" || new Date() < new Date(rowData.subscriptions_end_at),
          }),
        ]}
      />

      <Snackbar
        open={open.value}
        message={message.value}
        severity={severity.value}
        onClose={onSnackClose}
      />
    </>
  )
}
