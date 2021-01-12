import Image from "next/image"
import { Suspense } from "react"
import Tab from "@material-ui/core/Tab"
import { useMemo, useState } from "react"
import { TextField, Switches } from "mui-rff"
import AppBar from "@material-ui/core/AppBar"
import Divider from "@material-ui/core/Divider"
import TabList from "@material-ui/lab/TabList"
import TabContext from "@material-ui/lab/TabContext"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import CircularProgress from "@material-ui/core/CircularProgress"

import OpenInNew from "mdi-material-ui/OpenInNew"

import { User } from "db"
import TabPanel from "app/layouts/TabPanel"
import { Form, FORM_ERROR } from "app/components/forms/Form"
import RolesForm from "app/components/dashboard/users/RolesForm"
import EnhancedTextField from "app/components/forms/EnhancedTextfield"
import PromotionsForm from "app/components/dashboard/users/PromotionsForm"
import { UserInput, UserInputType } from "app/components/forms/validations"

type UserFormProps = {
  initialValues: User | null
  onSuccess: (values: UserInputType) => void
  onClose: () => void
}

export default function UserForm(props: UserFormProps) {
  const [value, setValue] = useState("0")

  const handleChange = (_, newValue: string) => setValue(newValue)

  const onSubmit = async (values: UserInputType) => {
    try {
      await props.onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
      }
    }
  }

  const initialValues = useMemo(
    () => ({
      id: props.initialValues?.id,
      lastname: props.initialValues?.lastname,
      firstname: props.initialValues?.firstname,
      nickname: props.initialValues?.nickname,
      image: props.initialValues?.image,
      email: props.initialValues?.email,
      card: props.initialValues?.card,
      balance: props.initialValues?.balance || 0,
      roles: props.initialValues?.roles || [],
      promotionId: props.initialValues?.promotionId,
      is_member: props.initialValues?.is_member || false,
      is_enabled: props.initialValues?.is_enabled || true,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }),
    []
  )

  return (
    <Form<UserInputType>
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={UserInput}
      initialValues={initialValues}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <TabContext value={value}>
        <AppBar position="static" color="inherit" elevation={0}>
          <TabList
            onChange={handleChange}
            textColor="primary"
            variant="fullWidth"
            indicatorColor="primary"
            aria-label="Nav"
          >
            <Tab label="Infos" value="0" />
            <Tab label="Rôles" value="1" />
          </TabList>
        </AppBar>

        <TabPanel value="0">
          <div className="mx-auto text-center">
            {props.initialValues?.id && props.initialValues?.image && (
              <Image
                className="rounded-full"
                src={props.initialValues.image}
                width={100}
                height={100}
                alt={`Image de ${props.initialValues?.lastname} ${props.initialValues?.firstname}`}
              />
            )}
          </div>

          <TextField
            type="text"
            name="image"
            label="URL de l'image de profil"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    href="https://imgur.com/upload"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ouvrir Imgur"
                  >
                    <OpenInNew />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField type="text" name="lastname" label="Nom" />
          <TextField type="text" name="firstname" label="Prénom" />
          <TextField type="text" name="nickname" label="Surnom" />

          <Divider className="m-2" />

          {props.initialValues?.id && (
            <EnhancedTextField type="number" name="card" label="N° de carte" />
          )}
          <TextField type="email" name="email" label="Email" />
          <EnhancedTextField
            type="number"
            name="balance"
            label="Solde"
            inputProps={{ step: 0.01 }}
          />

          <Divider className="m-2" />

          <div>
            <Suspense fallback={<CircularProgress size={25} />}>
              <PromotionsForm />
            </Suspense>
          </div>

          <Switches
            name="is_member"
            data={{ label: "Cotisant", value: "is_member" }}
            color="primary"
          />

          <Switches
            name="is_enabled"
            data={{ label: "Activé", value: "is_enabled" }}
            color="primary"
          />
        </TabPanel>

        <TabPanel className="p-0" value="1">
          <div>
            <Suspense fallback={<CircularProgress size={25} />}>
              <RolesForm values={props.initialValues} />
            </Suspense>
          </div>
        </TabPanel>
      </TabContext>
    </Form>
  )
}
