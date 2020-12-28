import Tab from "@material-ui/core/Tab"
import Avatar from "@material-ui/core/Avatar"
import AppBar from "@material-ui/core/AppBar"
import Divider from "@material-ui/core/Divider"
import TabList from "@material-ui/lab/TabList"
import MenuItem from "@material-ui/core/MenuItem"
import TabContext from "@material-ui/lab/TabContext"
import { TextField, Switches, Select } from "mui-rff"
import IconButton from "@material-ui/core/IconButton"
import { SyntheticEvent, useMemo, useState } from "react"
import InputAdornment from "@material-ui/core/InputAdornment"

import OpenInNew from "mdi-material-ui/OpenInNew"

import { User } from "db"
import TabPanel from "app/layouts/TabPanel"
import { usePromotions } from "app/hooks/usePromotions"
import { Form, FORM_ERROR } from "app/components/forms/Form"
import { UserInput, UserInputType } from "app/components/forms/validations"
import RolesForm from "app/components/dashboard/users/RolesForm"

type UserFormProps = {
  initialValues: User | null
  onSuccess: (values: UserInputType) => void
  onClose: () => void
}

export default function UserForm(props: UserFormProps) {
  const { promotions } = usePromotions()
  const [value, setValue] = useState("0")

  const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue)

  const onSubmit = async (values) => {
    try {
      await props.onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
      }
    }
  }

  const initialValues = useMemo(() => ({
    id: props.initialValues?.id,
    lastname: props.initialValues?.lastname || process.env.NODE_ENV === 'development' ? 'Hello' : undefined,
    firstname: props.initialValues?.firstname || process.env.NODE_ENV === 'development' ? 'Hello' : undefined,
    nickname: props.initialValues?.nickname ,
    image: props.initialValues?.image,
    email: props.initialValues?.email || process.env.NODE_ENV === 'development' ? 'adrien.lenoir42440@gmail.com' : undefined,
    card: props.initialValues?.card?.toString() || process.env.NODE_ENV === 'development' ? '900' : undefined,
    balance: props.initialValues?.balance?.toString() || '0',
    roles: props.initialValues?.roles || [],
    promotion: props.initialValues?.promotionId,
    is_member: props.initialValues?.is_member || false,
    is_enabled: props.initialValues?.is_enabled || true,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

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
          {props.initialValues?.id && (
            <Avatar
              className="mx-auto w-32 h-32"
              src={props.initialValues?.image || undefined}
              alt={`Image de ${props.initialValues?.lastname} ${props.initialValues?.firstname}`}
            />
          )}
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

          <TextField type="email" name="email" label="Email" />
          <TextField type="number" name="card" label="N° de carte" />
          <TextField type="number" name="balance" label="Solde" inputProps={{ step: 0.01 }} />

          <Divider className="m-2" />

          <Select name="promotion" label="Promotion" formControlProps={{ margin: "normal" }}>
            {promotions.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.year}</MenuItem>
            ))}
          </Select>

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
            <RolesForm values={props.initialValues} />
          </div>
        </TabPanel>
      </TabContext>
    </Form>
  )
}
