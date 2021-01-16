import Image from "next/image"
import { useState } from "react"
import Menu from "@material-ui/core/Menu"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import MenuItem from "@material-ui/core/MenuItem"
import { useMutation, invalidateQuery } from "blitz"
import Typography from "@material-ui/core/Typography"

import Plus from "mdi-material-ui/Plus"

import { Event } from "db"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import SubscriptionCard from "./SubscriptionCard"
import { EventSubscriptionWithTypedCart } from "types"
import AddSubscriptionDialog from "./add/AddSubscriptionDialog"
import { AddSubscriptionInputType } from "app/components/forms/validations"
import getEventSubscriptions from "app/entities/eventSubscriptions/queries/getEventSubscriptions"
import createEventSubscription from "app/entities/eventSubscriptions/mutations/createEventSubscription"
import updateEventSubscription from "app/entities/eventSubscriptions/mutations/updateEventSubscription"
import deleteEventSubscription from "app/entities/eventSubscriptions/mutations/deleteEventSubscription"
import SubscriptionForm from "app/components/dashboard/clubs/dashboard/event/manager/list/SubscriptionForm"

type SubscriptionsListProps = {
  event: Event
  eventSubscriptions: EventSubscriptionWithTypedCart[]
}

export default function SubscriptionsList({
  event,
  eventSubscriptions = [],
}: SubscriptionsListProps) {
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
        onShow("success", "Ajoutée")
        invalidateQuery(getEventSubscriptions)
      })
      .catch((err) => onShow("error", err.message))
  }

  const onStopAdd = () => setIsAddSubscriptionOpen(false)

  const onEdit = () => {
    setIsEditMode(true)
    setAnchorEl(null)
  }

  const onEditSuccess = async (data) => {
    await updateSub({
      where: { id: selected?.id },
      data,
    })
      .then(() => {
        setSelected(null)
        setIsEditMode(false)
        onShow("success", "Sauvegardée")
        invalidateQuery(getEventSubscriptions)
      })
      .catch((err) => onShow("error", err.message))
  }

  const onStopEdit = () => {
    setSelected(null)
    setIsEditMode(false)
  }

  const onDelete = async () => {
    setAnchorEl(null)
    await deleteSub({ where: { id: selected?.id } })
      .then(() => {
        setSelected(null)
        onShow("success", "Supprimée")
        invalidateQuery(getEventSubscriptions)
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

      {eventSubscriptions.length === 0 && (
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
        {eventSubscriptions.map((x, key) =>
          isEditMode && x.id === selected?.id ? (
            <SubscriptionForm
              key={key}
              subscription={x}
              onStopEdit={onStopEdit}
              onSuccess={onEditSuccess}
            />
          ) : (
            <SubscriptionCard key={key} subscription={x} onMenuClick={onMenuClick} />
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
