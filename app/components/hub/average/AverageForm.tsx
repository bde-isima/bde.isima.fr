import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { createContext, useEffect, useState } from 'react'

import { Year } from 'global'
import AverageData from './data'

import {
  computeUEAverage,
  computeSectorAverage,
  computeSemesterAverage,
  computeYearAverage,
} from './averageComputing'
import Semesters from './Semesters'
import { importAverageData, saveAverageData } from './averageStorage'

export const AverageContext = createContext({
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

function AverageForm() {
  const savedData = importAverageData()

  const [averageFormState, setAverageFormState] = useState({
    currentYearIndex: savedData.currentYearIndex,
    currentSectorIndex: savedData.currentSectorIndex,
  })

  const [averageDataState, setAverageDataState] = useState<Year[]>(savedData.averageData)

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

            ue.average = computeUEAverage(ue)
            sector.ues[ueIndex] = ue
          }

          sector.average = computeSectorAverage(sector)
          semester.sectors[sectorIndex] = sector
        }

        semester.average = computeSemesterAverage(semester, averageFormState.currentSectorIndex)
        year.semesters[semesterIndex] = semester
      }

      year.average = computeYearAverage(year)
      newState[yearIndex] = year
    }

    setAverageDataState(newState)
  }

  useEffect(() => {
    saveAverageData(
      averageDataState,
      averageFormState.currentYearIndex,
      averageFormState.currentSectorIndex
    )
  }, [averageDataState, averageFormState])

  const averageContextValue = {
    data: averageDataState,
    updateData: updateSubjectMark,
  }

  const handleYearChange = (event) => {
    setAverageFormState({
      ...averageFormState,
      currentYearIndex: event.target.value,
    })
  }

  const handleSectorChange = (event) => {
    setAverageFormState({
      ...averageFormState,
      currentSectorIndex: event.target.value,
    })
  }

  const yearInput = (
    <FormControl className="m-2">
      <InputLabel shrink>Année</InputLabel>
      <Select value={averageFormState.currentYearIndex} onChange={handleYearChange}>
        {averageDataState.map((year, index) => {
          return (
            <MenuItem key={'avg-year-' + index} value={index}>
              {year.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )

  const currentYear = averageDataState[averageFormState.currentYearIndex]

  const sectorInput = (() => {
    const sectors = averageDataState[averageFormState.currentYearIndex].semesters[0].sectors

    return (
      <FormControl className="m-2">
        <InputLabel shrink>Filière</InputLabel>
        <Select
          value={averageFormState.currentSectorIndex}
          onChange={handleSectorChange}
          disabled={!(sectors.length > 1)}
        >
          {averageDataState[averageFormState.currentYearIndex].semesters[0].sectors?.map(
            (sector, index) => {
              if (index === 0) {
                return null
              }

              return (
                <MenuItem key={'avg-sector-' + index} value={index}>
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
          yearIndex={averageFormState.currentYearIndex}
          sectorIndex={averageFormState.currentSectorIndex}
        />

        <br />
        <Typography align={'center'} variant="h4">
          Moyenne de {currentYear.name} : {currentYear.average ?? 'N/A'}
        </Typography>
      </div>
    </AverageContext.Provider>
  )
}

export default AverageForm
