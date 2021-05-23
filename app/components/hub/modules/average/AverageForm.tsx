import React, { useEffect, useState } from "react"
import { InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core"

import AverageData from "./mcc_data/AverageData"
import { SectorData, SemesterData, SubjectData, Year } from "./types"
import FormControl from "@material-ui/core/FormControl"

import Semesters from "./Semesters"
import Typography from "@material-ui/core/Typography"

const importAverageData = (): {
  averageData: Year[]
  currentYear: number
  currentSector: number
} => {
  let data: any = localStorage.getItem("average_data")
  if (data === null) {
    data = {
      averageData: AverageData,
      currentYear: 0,
      currentSector: 0,
    }
  } else {
    data = JSON.parse(data)
  }

  return data
}

const saveAverageData = (averageData: Year[], currentYear: number, currentSector: number) => {
  const dataToStore = {
    averageData: averageData,
    currentYear: currentYear,
    currentSector: currentSector,
  }

  const dataToStoreStr = JSON.stringify(dataToStore)

  localStorage.setItem("average_data", dataToStoreStr)
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

  const savedData = importAverageData()

  const [averageFormState, setAverageFormState] = useState({
    currentYear: savedData.currentYear,
    currentSector: savedData.currentSector,
  })

  const [averageDataState, setAverageDataState] = useState<Year[]>(savedData.averageData)

  const computeAverage = (subjects: SubjectData[]): number | undefined => {
    let average = 0
    let coefSum = 0

    for (let subjectIndex in subjects) {
      if (subjects[subjectIndex].mark == null) {
        continue
      }

      // @ts-ignore
      average += subjects[subjectIndex].mark * subjects[subjectIndex].coef
      coefSum += subjects[subjectIndex].coef
    }

    if (coefSum === 0) {
      return undefined
    }

    average /= coefSum

    return Math.round(average * 1000) / 1000
  }

  const computeSectorAverage = (sector: SectorData): number | undefined => {
    let average = 0
    let sum = 0

    for (let ueIndex in sector.ues) {
      if (sector.ues[ueIndex].average == null) {
        continue
      }

      // @ts-ignore
      average += sector.ues[ueIndex].average
      sum++
    }

    if (sum === 0) {
      return undefined
    }

    average /= sum

    return Math.round(average * 1000) / 1000
  }

  const computeSemesterAverage = (semester: SemesterData): number | undefined => {
    let average = 0
    let count = 0

    // Tronc commun
    if (semester.sectors[0].average) {
      // @ts-ignore
      average += semester.sectors[0].average
      count++
    }

    if (semester.sectors[averageFormState.currentSector].average) {
      // @ts-ignore
      average += semester.sectors[averageFormState.currentSector].average
      count++
    }

    if (average === 0) {
      return undefined
    }

    average /= 2

    return Math.round(average * 1000) / 1000
  }

  const computeYearAverage = (year: Year): number | undefined => {
    let average = 0
    let sum = 0

    for (let semesterIndex in year.semesters) {
      if (year.semesters[semesterIndex].average == null) {
        continue
      }

      // @ts-ignore
      average += year.semesters[semesterIndex].average
      sum++
    }

    if (sum === 0) {
      return undefined
    }

    average /= sum

    return Math.round(average * 1000) / 1000
  }

  const updateSubjectMark = (
    yearIndex: number,
    semesterIndex: number,
    sectorIndex: number,
    ueIndex: number,
    subjectIndex: number,
    mark: number
  ) => {
    let newState: Year[] = [...averageDataState]

    {
      let year = newState[yearIndex]

      {
        let semester = year.semesters[semesterIndex]

        {
          let sector = semester.sectors[sectorIndex]

          {
            let ue = sector.ues[ueIndex]

            ue.subjects[subjectIndex].mark = mark

            ue.average = computeAverage(ue.subjects)
            sector.ues[ueIndex] = ue
          }

          sector.average = computeSectorAverage(sector)
          semester.sectors[sectorIndex] = sector
        }

        semester.average = computeSemesterAverage(semester)
        year.semesters[semesterIndex] = semester
      }

      year.average = computeYearAverage(year)
      newState[yearIndex] = year
    }

    setAverageDataState(newState)
  }

  useEffect(() => {
    saveAverageData(averageDataState, averageFormState.currentYear, averageFormState.currentSector)
  }, [averageDataState, averageFormState])

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

  const currentYear = averageDataState[averageFormState.currentYear]

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

        <br />
        <Typography align={"center"} variant="h4">
          Moyenne de {currentYear.name} : {currentYear.average ?? "N/A"}
        </Typography>
      </div>
    </AverageContext.Provider>
  )
}

export default AverageForm
