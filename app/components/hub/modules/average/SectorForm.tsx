import { useState } from "react"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"

import { useBDESession } from "../../../auth/SessionProvider"
import UETable from "./UETable"
import { SectorData } from "./AverageData"

export default function SectorForm(props: { data: SectorData[] }) {
  const session = useBDESession()
  const [currentSector, setCurrentSector] = useState<number>(-1)

  const onChange = (value) => {
    console.log(value)
    setCurrentSector(value.target.value)
  }

  console.log(props.data[0].semesters[0])

  return (
    <>
      <br />
      <br />
      <TextField
        id="outlined-select-currency"
        select
        label="Filière"
        value={currentSector}
        onChange={onChange}
        helperText="Veuillez sélectionner votre année"
        variant="outlined"
      >
        {Object.keys(props.data).map((_, index) => (
          <MenuItem key={"sector-" + index} value={index}>
            {props.data[index].name}
          </MenuItem>
        ))}
      </TextField>

      {currentSector === -1 ? (
        <></>
      ) : (
        Object.keys(props.data[currentSector].semesters).map((_, semester) => (
          <>
            <UETable
              name={"Semestre " + (semester + 1)}
              rows={props.data[currentSector].semesters[semester]}
            />
            <br />
          </>
        ))
      )}
    </>
  )
}
