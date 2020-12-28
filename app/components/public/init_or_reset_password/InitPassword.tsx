import { SyntheticEvent } from "react"
import Paper from "@material-ui/core/Paper"
import NoSsr from "@material-ui/core/NoSsr"
import { useMutation, useRouter } from "blitz"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import InitOrResetPasswordForm from "./InitOrResetPasswordForm"
import initPassword from 'app/entities/users/mutations/initPassword'
import { InitOrResetPasswordInputType } from "app/components/forms/validations"

export default function InitPassword() {
    const router = useRouter()
    const [initPwd] = useMutation(initPassword)
    const { open, message, severity } = useSnackbar()

    const onSuccess = async (data: InitOrResetPasswordInputType) => {
        await initPwd({
            ...data,
            token: `${router.query.token}`,
        })
        .then(() => {
            router.push('/hub')
        })
        .catch((err) => {
            message.set(err.message)
            severity.set("error")
            open.set(true)
        })
    }

    const onSnackClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
        if (reason === "clickaway") return
        open.set(false)
    }

    return (
        <Container className="pt-24">
            <Paper className="p-4">
                <Typography variant="h4" paragraph>
                    Initialisation du mot de passe
                </Typography>

                <NoSsr>
                    <InitOrResetPasswordForm onSuccess={onSuccess} />
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
