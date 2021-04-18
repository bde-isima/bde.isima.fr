import { useBDESession } from "app/components/auth/SessionProvider"
import { UserInput, UserInputType } from "../../forms/validations"
import TabContext from "@material-ui/lab/TabContext"
import AppBar from "@material-ui/core/AppBar"
import TabList from "@material-ui/lab/TabList"
import Tab from "@material-ui/core/Tab"
import TabPanel from "../../../layouts/TabPanel"
import Image from "next/image"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"

// import { Switches, TextField } from "mui-rff"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import OpenInNew from "mdi-material-ui/OpenInNew"
import Divider from "@material-ui/core/Divider"
import EnhancedTextField from "../../forms/EnhancedTextfield"
import { Suspense, useEffect, useMemo, useState } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import PromotionsForm from "../../dashboard/users/PromotionsForm"
import RolesForm from "../../dashboard/users/RolesForm"
import { Form, FORM_ERROR } from "../../forms/Form"
import { useTheme } from "@material-ui/core"

import UETable from "./UETable"
import PageTitle from "../../../layouts/PageTitle"
import Table from "../../dashboard/data/Table"
import getClubs from "../../../entities/clubs/queries/getClubs"
import upsertClub from "../../../entities/clubs/mutations/upsertClub"
import deleteManyClubs from "../../../entities/clubs/mutations/deleteManyClubs"
import ClubForm from "../../dashboard/clubs/ClubForm"
import { AverageData, MCCData, UEData, SubjectData } from "./AverageData"
import { createUEData } from "./UEForm/UEData"

export default function AverageForm() {
  const session = useBDESession()

  const theme = useTheme()
  const [currentYear, setCurrentYear] = useState<string | null>(null)

  const onChange = (value) => {
    setCurrentYear(value.target.value)
  }

  return (
    <>
      <TextField
        id="outlined-select-currency"
        select
        label="Année"
        // value={currency}
        onChange={onChange}
        helperText="Veuillez sélectionner votre année"
        variant="outlined"
      >
        {Object.keys(AverageData).map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      {currentYear === null ? (
        <></>
      ) : (
        Object.keys(AverageData[currentYear]).map((_, semester) => (
          <>
            <UETable
              name={"Semestre " + (semester + 1)}
              rows={AverageData[currentYear][semester]}
            />
            <br />
          </>
        ))
      )}
    </>
    // <Form<UserInputType>
    //   submitText="Valider"
    //   variant="dialog"
    //   // onClose={props.onClose}
    //   schema={UserInput}
    //   // initialValues={initialValues}
    //   onSubmit={onSubmit}
    //   autoComplete="off"
    // >
    //   <TabContext value={value}>
    //     <AppBar position="static" color="inherit" elevation={0}>
    //       <TabList
    //         onChange={handleChange}
    //         variant="fullWidth"
    //         textColor={theme.palette.mode === "dark" ? "secondary" : "primary"}
    //         indicatorColor={theme.palette.mode === "dark" ? "secondary" : "primary"}
    //         aria-label="Nav"
    //       >
    //         <Tab label="Infos" value="0" />
    //         <Tab label="Rôles" value="1" />
    //       </TabList>
    //     </AppBar>
    //
    //     <TabPanel value="0">
    //       {/*<div className="mx-auto text-center">*/}
    //       {/*  {props.initialValues?.id && props.initialValues?.image && (*/}
    //       {/*    <Image*/}
    //       {/*      className="rounded-full"*/}
    //       {/*      src={props.initialValues.image}*/}
    //       {/*      width={100}*/}
    //       {/*      height={100}*/}
    //       {/*      alt={`Image de ${props.initialValues?.lastname} ${props.initialValues?.firstname}`}*/}
    //       {/*    />*/}
    //       {/*  )}*/}
    //       {/*</div>*/}
    //
    //       <TextField
    //         type="text"
    //         name="image"
    //         label="URL de l'image de profil"
    //         InputProps={{
    //           endAdornment: (
    //             <InputAdornment position="end">
    //               <IconButton
    //                 href="https://imgur.com/upload"
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 aria-label="Ouvrir Imgur"
    //               >
    //                 <OpenInNew />
    //               </IconButton>
    //             </InputAdornment>
    //           ),
    //         }}
    //       />
    //
    //       <TextField type="text" name="lastname" label="Nom" />
    //       <TextField type="text" name="firstname" label="Prénom" />
    //       <TextField type="text" name="nickname" label="Surnom" />
    //
    //       <Divider className="m-2" />
    //
    //       {/*{props.initialValues?.id && (*/}
    //       {/*  <EnhancedTextField type="number" name="card" label="N° de carte" />*/}
    //       {/*)}*/}
    //       <TextField type="email" name="email" label="Email" />
    //       <EnhancedTextField
    //         type="number"
    //         name="balance"
    //         label="Solde"
    //         inputProps={{ step: 0.01 }}
    //       />
    //
    //       <Divider className="m-2" />
    //
    //       <Switches
    //         name="save"
    //         data={{ label: "Sauvegarder dans le navigateur", value: "save" }}
    //         color="primary"
    //       />
    //     </TabPanel>
    //
    //     <TabPanel className="p-0" value="1">
    //       <div>
    //         {/*<Suspense fallback={<CircularProgress size={25} />}>*/}
    //         {/*  <RolesForm values={props.initialValues} />*/}
    //         {/*</Suspense>*/}
    //       </div>
    //     </TabPanel>
    //   </TabContext>
    // </Form>
  )
}
