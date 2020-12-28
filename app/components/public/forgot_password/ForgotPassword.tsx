import { useMutation } from "blitz"
import { SyntheticEvent } from "react"
import Paper from "@material-ui/core/Paper"
import NoSsr from "@material-ui/core/NoSsr"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import ForgotPasswordForm from "./ForgotPasswordForm"
import forgotPassword from 'app/entities/users/mutations/forgotPassword'
import { ForgotPasswordInputType } from "app/components/forms/validations"

export default function ForgotPassword() {
    const [forgotPwd] = useMutation(forgotPassword)
    const { open, message, severity } = useSnackbar()

    const onSuccess = async (data: ForgotPasswordInputType) => {
        await forgotPwd(data)
            .then(() => {
                message.set("Envoyé !")
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
        <Container className="pt-24">
            <Paper className="p-4">
                <Typography variant="h4" paragraph>
                    Oubli de mot de passe
                </Typography>

                <NoSsr>
                    <ForgotPasswordForm onSuccess={onSuccess} />
                </NoSsr>

                <Snackbar
                    open={open.value}
                    message={message.value}
                    severity={severity.value}
                    onClose={onSnackClose}
                />
            </Paper>
        </Container>
    )
}
