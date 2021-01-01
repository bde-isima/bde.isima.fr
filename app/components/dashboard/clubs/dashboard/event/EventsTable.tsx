import { useState } from 'react'
import { format } from "date-fns"
import { CsvBuilder } from 'filefy'

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

  const exportCsv = rowData => {
    new CsvBuilder(`${rowData.name}.csv`)
      //Default delimiter
      .setDelimeter(',')
      //We add the distinct columns to the CSV for readability considerations
      .setColumns(['Moyen de paiement', 'Carte', 'Nom', 'Prénom', ...rowData.products.map(x => x.name), 'Total'])
      //Then we add on the rows the corresponding information 
      .addRows(rowData.EventSubscription.map(sub => {
          return [
              sub.payment_method,
              sub.user.card,
              sub.user.lastname,
              sub.user.firstname,
              ...rowData.products.reduce((acc, curr) => {
                  const items = sub.cart.filter(item => item.name === curr.name)
                  if (items.length) {
                    return [
                        ...acc, 
                        items.map(x => `x${x.quantity} - ${x.name} ${x.options.map(x => x.name).join(', ')} ${x.comment ? `(${x.comment})` : ''}`.trim()).join('\n')
                    ]
                  }
                  return acc.concat('')
              }, []),
              sub.cart.reduce((acc, cartItem) => {
                return acc + cartItem.quantity * (cartItem.price + cartItem.options.reduce((acc, o) => {
                  return  acc + o.price
                }, 0))
              }, 0).toFixed(2)
          ]
      }))
      .exportFile()
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
        queryArgs={{ 
          where: { clubId: club.id }, 
          include: { EventSubscription: { include: { user: true } } },
        }}
        upsertQuery={upsertEvent}
        deleteQuery={deleteManyEvents}
        FormComponent={EventForm}
        allowCopy
        onExport={exportCsv}
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
