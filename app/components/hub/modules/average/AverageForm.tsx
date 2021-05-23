import React, { useContext, useState } from "react"
import { InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core"

import AverageData from "./mcc_data/AverageData"
import { Year } from "./mcc_data/AverageDataTypes"
import FormControl from "@material-ui/core/FormControl"

import Semesters from "./Semesters"
import { useBDESession } from "../../../auth/SessionProvider"

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

export const AverageContext = React.createContext({
  data: AverageData,
  updateData: (
    yearIndex: number,
    semesterIndex: number,
    sectorIndex: number,
    ueIndex: number,
    subjectIndex: number,
    mark: number
  ) => {},
})

function AverageForm(props) {
  const classes = useStyles()

  // const sessionContext = useBDESession();

  const [averageFormState, setAverageFormState] = useState({
    currentYear: 0,
    currentSector: 0,
  })

  const [averageDataState, setAverageDataState] = useState<Year[]>(importData())

  const updateSubjectMark = (
    yearIndex: number,
    semesterIndex: number,
    sectorIndex: number,
    ueIndex: number,
    subjectIndex: number,
    mark: number
  ) => {
    let newState: Year[] = [...averageDataState]
    newState[yearIndex].semesters[semesterIndex].sectors[sectorIndex].ues[ueIndex].subjects[
      subjectIndex
    ].mark = mark

    setAverageDataState(newState)
  }

  const averageContextValue = {
    data: averageDataState,
    updateData: updateSubjectMark,
  }

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
        {averageDataState.map((year, index) => {
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
    const sectors = averageDataState[averageFormState.currentYear].semesters[0].sectors

    return (
      <FormControl className={classes.formControl}>
        <InputLabel shrink>Filière</InputLabel>
        <Select
          value={averageFormState.currentSector}
          onChange={handleSectorChange}
          disabled={!(sectors.length > 1)}
        >
          {averageDataState[averageFormState.currentYear].semesters[0].sectors?.map(
            (sector, index) => {
              if (index === 0) {
                return null
              }

              return (
                <MenuItem key={"avg-sector-" + index} value={index}>
                  {sector.name}
                </MenuItem>
              )
            }
          )}
        </Select>
      </FormControl>
    )
  })()

  return (
    // @ts-ignore
    <AverageContext.Provider value={averageContextValue}>
      <div>
        {yearInput}
        {sectorInput}

        <Semesters
          yearIndex={averageFormState.currentYear}
          sectorIndex={averageFormState.currentSector}
        />
      </div>
    </AverageContext.Provider>
  )
}

export default AverageForm
