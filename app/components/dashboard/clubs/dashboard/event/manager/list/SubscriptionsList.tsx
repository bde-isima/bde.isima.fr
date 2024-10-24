import { useState } from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Event } from 'db';
import type { EventSubscriptionWithTypedCart } from 'global';

import Add from '@mui/icons-material/AddTwoTone';

import Image from 'next/image';

import { invalidateQuery, useMutation } from '@blitzjs/rpc';

import SubscriptionForm from 'app/components/dashboard/clubs/dashboard/event/manager/list/SubscriptionForm';
import { AddSubscriptionInputType } from 'app/components/forms/validations';
import Snackbar from 'app/core/layouts/Snackbar';
import createEventSubscription from 'app/entities/eventSubscriptions/mutations/createEventSubscription';
import deleteEventSubscription from 'app/entities/eventSubscriptions/mutations/deleteEventSubscription';
import updateEventSubscription from 'app/entities/eventSubscriptions/mutations/updateEventSubscription';
import getEventSubscriptions from 'app/entities/eventSubscriptions/queries/getEventSubscriptions';
import useSnackbar from 'app/entities/hooks/useSnackbar';

import SubscriptionCard from './SubscriptionCard';
import AddSubscriptionDialog from './add/AddSubscriptionDialog';

type SubscriptionsListProps = {
  event: Event;
  eventSubscriptions: EventSubscriptionWithTypedCart[];
};

export default function SubscriptionsList({ event, eventSubscriptions = [] }: SubscriptionsListProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddSubscriptionOpen, setIsAddSubscriptionOpen] = useState(false);

  const { open, message, severity, onShow, onClose } = useSnackbar();

  const [createSub] = useMutation(createEventSubscription);
  const [updateSub] = useMutation(updateEventSubscription);
  const [deleteSub] = useMutation(deleteEventSubscription);

  const onAdd = () => setIsAddSubscriptionOpen(true);

  const onAddSuccess = async (data: AddSubscriptionInputType) => {
    try {
      await createSub({
        data: {
          payment_method: 'BDE',
          cart: [],
          event: { connect: { id: event?.id } },
          user: { connect: { id: data.subscriber.id } }
        }
      });
      onShow('success', 'Ajoutée');
      await invalidateQuery(getEventSubscriptions);
    } catch (err) {
      onShow('error', err.message);
    }
  };

  const onStopAdd = () => setIsAddSubscriptionOpen(false);

  const onEdit = () => {
    setIsEditMode(true);
    setAnchorEl(null);
  };

  const onEditSuccess = async (data) => {
    try {
      await updateSub({
        where: { id: selected?.id },
        data
      });
      setSelected(null);
      setIsEditMode(false);
      onShow('success', 'Sauvegardée');
      await invalidateQuery(getEventSubscriptions);
    } catch (err) {
      onShow('error', err.message);
    }
  };

  const onStopEdit = () => {
    setSelected(null);
    setIsEditMode(false);
  };

  const onDelete = async () => {
    setAnchorEl(null);
    try {
      await deleteSub({ where: { id: selected?.id } });
      setSelected(null);
      onShow('success', 'Supprimée');
      await invalidateQuery(getEventSubscriptions);
    } catch (err) {
      onShow('error', err.message);
    }
  };

  const onMenuClick = (target, subscription) => {
    setSelected(subscription);
    setIsEditMode(false);
    setAnchorEl(target);
  };

  const onMenuClose = () => setAnchorEl(null);

  return (
    <div className="flex flex-col">
      <Typography variant="h6" align="center">
        Liste des inscrits à l&apos;événement
      </Typography>

      <Divider className="m-4" />

      <Button
        className="ml-auto m-2"
        startIcon={<Add />}
        aria-label="Ajouter"
        onClick={onAdd}
        variant="contained"
        color="primary"
      >
        Ajouter
      </Button>

      {eventSubscriptions.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <Image src="/static/images/illustrations/NoData.svg" width={300} height={300} alt="Aucune donnée" />
          <Typography variant="subtitle2" gutterBottom>
            Aucun inscrit
          </Typography>
        </div>
      )}

      <Grid container justifyContent="flex-start" spacing={4}>
        {eventSubscriptions.map((x, key) =>
          isEditMode && x.id === selected?.id ? (
            <SubscriptionForm key={key} subscription={x} onStopEdit={onStopEdit} onSuccess={onEditSuccess} />
          ) : (
            <SubscriptionCard key={key} subscription={x} onMenuClick={onMenuClick} />
          )
        )}
      </Grid>

      <AddSubscriptionDialog isOpen={isAddSubscriptionOpen} onSuccess={onAddSuccess} onClose={onStopAdd} />

      <Menu id="subscription-list-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onMenuClose}>
        <MenuItem onClick={onEdit}>Éditer</MenuItem>
        <MenuItem onClick={onDelete}>Supprimer</MenuItem>
      </Menu>

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </div>
  );
}
