import { useMutation } from "blitz"
import { useTheme } from "@material-ui/core"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import { User } from "db"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import AdminTransferForm from "./AdminTransferForm"
import { AdminTransferInputType } from "app/components/forms/validations"
import createAdminTransaction from "app/entities/transactions/mutations/createAdminTransaction"

type AdminTransferProps = {
  user: User | null
  onComplete: () => void
}

export default function AdminTransfer({ user, onComplete }: AdminTransferProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const { open, message, severity, onShow, onClose } = useSnackbar()

  const [createTransaction] = useMutation(createAdminTransaction)

  const onSuccess = async (data: AdminTransferInputType) => {
    if (user?.id) {
      const amount = parseFloat(data.amount)
      await createTransaction({
        data: {
          amount,
          description: data.description,
          user: { connect: { id: user.id } },
        },
      })
        .then(() => {
          onShow("success", "Envoyé")
          onComplete()
        })
        .catch((err) => onShow("error", err.message))
    }
  }

  return (
    <>
      <AdminTransferForm onSuccess={onSuccess} />

      <Snackbar
        className={fullScreen ? "bottom-16" : ""}
        open={open}
        message={message}
        severity={severity}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: fullScreen ? "center" : "right" }}
      />
    </>
  )
}
