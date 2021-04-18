import { useState } from "react"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"

import { useBDESession } from "../../../auth/SessionProvider"
import UETable from "./UETable"
import { AverageData, instanceOfSectorData } from "./AverageData"
import SectorForm from "./SectorForm"

export default function AverageForm() {
  const session = useBDESession()
  const [currentYear, setCurrentYear] = useState<string>("")

  const onChange = (value) => {
    setCurrentYear(value.target.value)
  }

  const innerContent =
    currentYear !== "" ? (
      instanceOfSectorData(AverageData[currentYear][0]) ? (
        <SectorForm data={AverageData[currentYear]} />
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
      )
    ) : (
      <></>
    )

  return (
    <>
      <TextField
        id="outlined-select-currency"
        select
        label="Année"
        value={currentYear}
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

      {innerContent}
    </>
  )
}
