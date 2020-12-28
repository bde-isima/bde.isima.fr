import Menu from '@material-ui/core/Menu'
import Grid from '@material-ui/core/Grid'
import { useMutation, Image } from 'blitz'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { useState, SyntheticEvent } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import Plus from 'mdi-material-ui/Plus'

import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import SubscriptionCard from './SubscriptionCard'
import { AddSubscriptionInputType } from 'app/components/forms/validations'
import AddSubscriptionDialog from './add/AddSubscriptionDialog'
import createEventSubscription from 'app/entities/eventSubscriptions/mutations/createEventSubscription'
import updateEventSubscription from 'app/entities/eventSubscriptions/mutations/updateEventSubscription'
import deleteEventSubscription from 'app/entities/eventSubscriptions/mutations/deleteEventSubscription'
import SubscriptionForm from 'app/components/dashboard/clubs/dashboard/event/manager/list/SubscriptionForm'

export default function SubscriptionsList({ event, eventSubscriptionsQueryResult: [{ eventSubscriptions }, { isFetching, refetch }] }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selected, setSelected] = useState<any>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isAddSubscriptionOpen, setIsAddSubscriptionOpen] = useState(false)

  const { open, message, severity } = useSnackbar()

  const [createSubscription] = useMutation(createEventSubscription)
  const [updateSubscription] = useMutation(updateEventSubscription)
  const [deleteSubscription] = useMutation(deleteEventSubscription)

  const onAdd = () => setIsAddSubscriptionOpen(true)

  const onAddSuccess = async (data: AddSubscriptionInputType) => {
    await createSubscription({
      data: {
        payment_method: 'BDE',
        cart: [],
        event: { connect: { id: event?.id } },
        user: { connect: { id: data.subscriber.id } },
      }
    })
      .then(() => {
        refetch()
        message.set("Ajouté")
        severity.set("success")
      })
      .catch(err => {
        message.set(err.message)
        severity.set("error")
      })
      .finally(() => open.set(true))
  }

  const onStopAdd = () => setIsAddSubscriptionOpen(false)

  const onEdit = () => {
    setIsEditMode(true)
    setAnchorEl(null)
  }

  const onEditSuccess = async data => {
    await updateSubscription({ 
      where: { id: selected?.id },
      data,
    })
      .then(() => {
        refetch()
        setSelected(null)
        setIsEditMode(false)
        message.set("Sauvegardé")
        severity.set("success")
      })
      .catch(err => {
        message.set(err.message)
        severity.set("error")
      })
      .finally(() => open.set(true))
  }

  const onStopEdit = () => {
    setSelected(null)
    setIsEditMode(false)
  }

  const onDelete = async () => {
    setAnchorEl(null)
    await deleteSubscription({ where: { id: selected?.id } })
      .then(() => {
        refetch()
        setSelected(null)
        message.set("Supprimée")
        severity.set("success")
      })
      .catch(err => {
        message.set(err.message)
        severity.set("error")
      })
      .finally(() => open.set(true))
  }

  const onMenuClick = (target, subscription) => {
    setSelected(subscription)
    setIsEditMode(false)
    setAnchorEl(target)
  } 

  const onClose = () => setAnchorEl(null)

  const onSnackClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") return
    open.set(false)
  }

  return (
    <div className="flex flex-col">
      <Typography variant="h6" align="center">
        Liste des inscrits à l'événement
      </Typography>

      <Divider className="m-4" />

      <Button
        className="ml-auto m-2"
        startIcon={<Plus />}
        aria-label="Ajouter"
        onClick={onAdd}
        variant="contained"
        color="primary"
      >
        Ajouter
      </Button>

      {!isFetching && eventSubscriptions.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/static/images/illustrations/NoData.svg"
            height="auto"
            width="300"
            alt="Aucune donnée"
          />
            <Typography variant="subtitle2" gutterBottom>
                Aucun inscrit
            </Typography>
        </div>
      )}

      <Grid container justifyContent="flex-start" spacing={4}>
        {(isFetching ? [...Array(6).keys()] : eventSubscriptions).map((x, key) => (
          (isEditMode && x.id === selected.id) ? (
            <SubscriptionForm
              key={key}
              subscription={x}
              isLoading={isFetching}
              onStopEdit={onStopEdit}
              onSuccess={onEditSuccess}
            />
          ) : (
            <SubscriptionCard
              key={key}
              subscription={x}
              isLoading={isFetching}
              onMenuClick={onMenuClick}
            />
          )
        ))}
      </Grid>

      <AddSubscriptionDialog 
        isOpen={isAddSubscriptionOpen} 
        onSuccess={onAddSuccess}
        onClose={onStopAdd} 
      />

      <Menu
        id="subscription-list-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem onClick={onEdit}>
          Éditer
        </MenuItem>
        <MenuItem onClick={onDelete}>
          Supprimer
        </MenuItem>
      </Menu>

      <Snackbar
        open={open.value}
        message={message.value}
        severity={severity.value}
        onClose={onSnackClose}
      />
    </div>
  )
}
