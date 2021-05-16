import React, { useState } from "react"
import { InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core"

import AverageData from "./data/AverageData"
import { Year } from "./data/AverageDataTypes"
import FormControl from "@material-ui/core/FormControl"

import Semesters from "./Semesters"

const importData = () => {
  let data: any = localStorage.getItem("average_data")
  if (data === null) {
    data = AverageData
  } else {
    data = JSON.parse(data)
  }

  return data as Year[]
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

function AverageForm(props) {
  const classes = useStyles()

  const [averageFormState, setAverageFormState] = useState({
    averageData: importData(),
    currentYear: 0,
    currentSector: 0,
  })

  const handleYearChange = (event) => {
    setAverageFormState({
      ...averageFormState,
      currentYear: event.target.value,
    })
  }

  const handleSectorChange = (event) => {
    setAverageFormState({
      ...averageFormState,
      currentSector: event.target.value,
    })
  }

  const yearInput = (
    <FormControl className={classes.formControl}>
      <InputLabel shrink>Année</InputLabel>
      <Select value={averageFormState.currentYear} onChange={handleYearChange}>
        {averageFormState.averageData.map((year, index) => {
          return (
            <MenuItem key={"avg-year-" + index} value={index}>
              {year.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )

  const sectorInput = (() => {
    const sectors = averageFormState.averageData[averageFormState.currentYear].semesters[0].sectors

    return (
      <FormControl className={classes.formControl}>
        <InputLabel shrink>Filière</InputLabel>
        <Select
          value={averageFormState.currentSector}
          onChange={handleSectorChange}
          disabled={!sectors}
        >
          {sectors
            ? averageFormState.averageData[averageFormState.currentYear].semesters[0].sectors?.map(
                (sector, index) => {
                  return (
                    <MenuItem key={"avg-sector-" + index} value={index}>
                      {sector.name}
                    </MenuItem>
                  )
                }
              )
            : null}
        </Select>
      </FormControl>
    )
  })()

  return (
    <div>
      {yearInput}
      {sectorInput}

      <Semesters
        year={averageFormState.averageData[averageFormState.currentYear]}
        sectorIndex={averageFormState.currentSector}
      />
    </div>
  )
}

export default AverageForm
