import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import { createContext, useEffect, useState } from 'react'

import Year from 'app/components/hub/average/Year'
import { YearData, AverageStoredData } from 'global'
import AverageData from 'app/components/hub/average/data'

const importData = (): AverageStoredData => {
  const storedData: string | null = localStorage.getItem('average_data')

  if (storedData !== null) {
    return JSON.parse(storedData)
  }

  return {
    averageData: AverageData,
    currentYear: 0,
    currentSector: undefined,
  }
}

const saveData = (averageData: YearData[], currentYear: number, currentSector?: number) => {
  const dataToStore = {
    averageData: averageData,
    currentYear: currentYear,
    currentSector: currentSector,
  }

  const dataToStoreStr = JSON.stringify(dataToStore)

  localStorage.setItem('average_data', dataToStoreStr)
}

export interface AverageModuleType {
  currentYear: number
  currentSector?: number
}

export const AverageModuleContext = createContext<AverageModuleType>({
  currentYear: 0,
  currentSector: undefined,
})

function AverageModule() {
  const savedData = importData()

  const [averageFormState, setAverageFormState] = useState<AverageModuleType>({
    currentYear: savedData.currentYear,
    currentSector: savedData.currentSector,
  })

  const [averageDataState, setAverageDataState] = useState<YearData[]>(savedData.averageData)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    saveData(averageDataState, averageFormState.currentYear, averageFormState.currentSector)
  }, [averageDataState])

  useEffect(() => {
    setMounted(true)
  }, [mounted])

  const handleYearChange = (event) => {
    let sector =
      averageDataState[event.target.value].semesters[0].sectors.length > 1 ? 1 : undefined

    if (averageFormState.currentSector !== undefined && sector !== undefined) {
      sector = averageFormState.currentSector
    }

    setAverageFormState({
      currentSector: sector,
      currentYear: event.target.value,
    })

    setMounted(false)
  }

  const handleSectorChange = (event) => {
    setAverageFormState({
      ...averageFormState,
      currentSector: event.target.value,
    })

    setMounted(false)
  }

  const yearInput = (
    <FormControl className={'w-1/4 pr-2'}>
      <InputLabel shrink>Année</InputLabel>
      <Select value={averageFormState.currentYear} onChange={handleYearChange}>
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

  const currentYear = averageDataState[averageFormState.currentYear]

  const sectorInput = (() => {
    const sectors = averageDataState[averageFormState.currentYear].semesters[0].sectors

    if (sectors.length === 1) {
      return <></>
    }

    return (
      <FormControl className={'w-1/4 pl-2'}>
        <InputLabel shrink>Filière</InputLabel>
        <Select
          value={averageFormState.currentSector}
          onChange={handleSectorChange}
          disabled={!(sectors.length > 1)}
        >
          {averageDataState[averageFormState.currentYear].semesters[0].sectors
            .slice(1)
            .map((sector, index) => {
              return (
                <MenuItem key={'avg-sector-' + index} value={index + 1}>
                  {sector.name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    )
  })()

  if (!mounted) {
    return <></>
  }

  return (
    <AverageModuleContext.Provider value={averageFormState}>
      <div>
        <div className="my-2">
          {yearInput}
          {sectorInput}
        </div>

        <Year
          yearData={currentYear}
          setYearData={(yearData) => {
            const newAverageState = [...averageDataState]

            newAverageState[averageFormState.currentYear] = yearData

            setAverageDataState(newAverageState)
          }}
        />

        <br />
        <Typography align={'center'} variant="h4" color="textPrimary">
          Moyenne de {currentYear.name} : {currentYear.average ?? 'N/A'}
        </Typography>
      </div>
    </AverageModuleContext.Provider>
  )
}

export default AverageModule
