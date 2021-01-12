import Image from "next/image"
import { useState } from "react"
import { useMutation } from "blitz"
import Menu from "@material-ui/core/Menu"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"

import Plus from "mdi-material-ui/Plus"

import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import SubscriptionCard from "./SubscriptionCard"
import AddSubscriptionDialog from "./add/AddSubscriptionDialog"
import { AddSubscriptionInputType } from "app/components/forms/validations"
import createEventSubscription from "app/entities/eventSubscriptions/mutations/createEventSubscription"
import updateEventSubscription from "app/entities/eventSubscriptions/mutations/updateEventSubscription"
import deleteEventSubscription from "app/entities/eventSubscriptions/mutations/deleteEventSubscription"
import SubscriptionForm from "app/components/dashboard/clubs/dashboard/event/manager/list/SubscriptionForm"

export default function SubscriptionsList({ event, result: [data, { isFetching }] }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selected, setSelected] = useState<any>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isAddSubscriptionOpen, setIsAddSubscriptionOpen] = useState(false)

  const { open, message, severity, onShow, onClose } = useSnackbar()

  const [createSub] = useMutation(createEventSubscription)
  const [updateSub] = useMutation(updateEventSubscription)
  const [deleteSub] = useMutation(deleteEventSubscription)

  const onAdd = () => setIsAddSubscriptionOpen(true)

  const onAddSuccess = async (data: AddSubscriptionInputType) => {
    await createSub({
      data: {
        payment_method: "BDE",
        cart: [],
        event: { connect: { id: event?.id } },
        user: { connect: { id: data.subscriber.id } },
      },
    })
      .then(() => {
        //TODO Refetch subscriptions
        onShow("success", "Ajoutée")
      })
      .catch((err) => onShow("error", err.message))
  }

  const onStopAdd = () => setIsAddSubscriptionOpen(false)

  const onEdit = () => {
    setIsEditMode(true)
    setAnchorEl(null)
  }

  const onEditSuccess = async (data) => {
    await updateSub
      .mutateAsync({
        where: { id: selected?.id },
        data,
      })
      .then(() => {
        //TODO Refetch subscriptions
        setSelected(null)
        setIsEditMode(false)
        onShow("success", "Sauvegardée")
      })
      .catch((err) => onShow("error", err.message))
  }

  const onStopEdit = () => {
    setSelected(null)
    setIsEditMode(false)
  }

  const onDelete = async () => {
    setAnchorEl(null)
    await deleteSub
      .mutateAsync({ where: { id: selected?.id } })
      .then(() => {
        //TODO Refetch subscriptions
        setSelected(null)
        onShow("success", "Supprimée")
      })
      .catch((err) => onShow("error", err.message))
  }

  const onMenuClick = (target, subscription) => {
    setSelected(subscription)
    setIsEditMode(false)
    setAnchorEl(target)
  }

  const onMenuClose = () => setAnchorEl(null)

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

      {!isFetching && data.eventSubscriptions.length === 0 && (
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
        {(isFetching ? [...Array(6).keys()] : data.eventSubscriptions).map((x, key) =>
          isEditMode && x.id === selected?.id ? (
            <SubscriptionForm
              key={key}
              subscription={x}
              isFetching={isFetching}
              onStopEdit={onStopEdit}
              onSuccess={onEditSuccess}
            />
          ) : (
            <SubscriptionCard
              key={key}
              subscription={x}
              isFetching={isFetching}
              onMenuClick={onMenuClick}
            />
          )
        )}
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
        onClose={onMenuClose}
      >
        <MenuItem onClick={onEdit}>Éditer</MenuItem>
        <MenuItem onClick={onDelete}>Supprimer</MenuItem>
      </Menu>

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </div>
  )
}
