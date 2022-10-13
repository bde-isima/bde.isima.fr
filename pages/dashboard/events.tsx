import { format } from 'date-fns';

import Check from '@mui/icons-material/CheckTwoTone';
import Euro from '@mui/icons-material/EuroTwoTone';

import { BlitzPage, Routes } from '@blitzjs/next';
import { invalidateQuery, useMutation } from '@blitzjs/rpc';

import Table from 'app/components/dashboard/data/Table';
import EventStatus from 'app/components/dashboard/events/EventStatus';
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';
import Snackbar from 'app/core/layouts/Snackbar';
import checkoutEvent from 'app/entities/events/mutations/checkoutEvent';
import deleteManyEvents from 'app/entities/events/mutations/deleteManyEvents';
import updateEvent from 'app/entities/events/mutations/updateEvent';
import upsertEvent from 'app/entities/events/mutations/upsertEvent';
import getEvents from 'app/entities/events/queries/getEvents';
import useSnackbar from 'app/entities/hooks/useSnackbar';

const today = new Date();

const Events: BlitzPage = () => {
  const { open, message, severity, onShow, onClose } = useSnackbar();

  const [updateEvnt] = useMutation(updateEvent);
  const [checkoutEvnt] = useMutation(checkoutEvent);

  const approve = (rowData) => async () => {
    try {
      await updateEvnt({ where: { id: rowData.id }, data: { status: 'ACCEPTED' } });
      onShow('success', 'Approuvé');
      await invalidateQuery(getEvents);
    } catch (err) {
      onShow('error', err.message);
    }
  };

  const checkout = (rowData) => async () => {
    try {
      await checkoutEvnt({ where: { id: rowData.id } });
      onShow('success', 'Encaissé');
      await invalidateQuery(getEvents);
    } catch (err) {
      onShow('error', err.message);
    }
  };

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
                status: { in: ['WAITING_APPROVAL'] }
              },
              {
                status: { in: ['ACCEPTED'] },
                takes_place_at: { lte: today }
              }
            ]
          }
        }}
        upsertQuery={upsertEvent}
        deleteQuery={deleteManyEvents}
        actions={[
          (rowData) => ({
            icon: <Check />,
            tooltip: 'Valider',
            onClick: approve,
            disabled: rowData.status !== 'WAITING_APPROVAL'
          }),
          (rowData) => ({
            icon: <Euro />,
            tooltip: 'Encaisser',
            onClick: checkout,
            disabled: rowData.status !== 'ACCEPTED' || new Date() < new Date(rowData.subscriptions_end_at)
          })
        ]}
      />

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </>
  );
};

Events.suppressFirstRenderFlicker = true;
Events.authenticate = { redirectTo: Routes.Login() };
Events.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Events());
Events.getLayout = (page) => getDashboardNav(page, 'Gestion des événements');

const columns = [
  {
    id: 'name',
    headerName: 'Name',
    searchCriteria: 'contains'
  },
  {
    id: 'description',
    headerName: 'Description',
    searchCriteria: 'contains'
  },
  {
    id: 'takes_place_at',
    headerName: "Date de l'événement",
    render: (row) => format(row.takes_place_at, 'dd/MM/yyyy - HH:mm')
  },
  {
    id: 'subscriptions_end_at',
    headerName: "Date limite d'inscription",
    render: (row) => format(row.subscriptions_end_at, 'dd/MM/yyyy - HH:mm')
  },
  {
    id: 'status',
    headerName: 'Statut',
    searchCriteria: 'contains',
    render: (row) => <EventStatus event={row} />
  },
  {
    id: 'max_subscribers',
    headerName: 'Nombre max de participants'
  }
];

export default Events;
