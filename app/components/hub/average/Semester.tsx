import Typography from '@mui/material/Typography'
import { useContext, useEffect, useState } from 'react'

import SectorTable from './SectorTable'
import { SectorData, SemesterData } from 'global'
import { AverageModuleContext } from './AverageModule'

interface SemesterPropsType {
  semesterIndex: number
  semesterData: SemesterData
  setSemesterData: (semesterData: SemesterData) => void
}

const Semester = ({ semesterIndex, semesterData, setSemesterData }: SemesterPropsType) => {
  const { currentSector } = useContext(AverageModuleContext)

  const [semesterState, setSemesterState] = useState<SemesterData>(semesterData)
  const [averageState, setAverageState] = useState(semesterData.average)

  useEffect(() => {
    setSemesterData({
      ...semesterState,
      average: averageState,
    })
  }, [averageState])

  useEffect(() => {
    setAverageState(computeSemesterAverage(semesterState.sectors))
  }, [semesterState])

  const computeSemesterAverage = (sectors: SectorData[]): number | undefined => {
    let semesterAverage = 0
    let count = 0

    // Tronc commun
    if (sectors[0].average && sectors[0].average !== undefined) {
      semesterAverage += sectors[0].average
      count++
    }

    if (currentSector !== undefined && sectors[currentSector] !== undefined) {
      const average = sectors[currentSector].average

      if (average !== undefined) {
        semesterAverage += average
        count++
      }
    }

    if (semesterAverage === 0) {
      return undefined
    }

    semesterAverage /= count

    return Math.round(semesterAverage * 1000) / 1000
  }

  return (
    <>
      <br />

      <Typography variant="h4" color="textPrimary">
        Semestre {semesterIndex + 1}
      </Typography>

      <SectorTable
        sectorData={semesterData.sectors[0]}
        setSectorData={(sectorData) => {
          if (
            semesterData.sectors[0] === undefined ||
            semesterData.sectors[0].name !== sectorData.name
          ) {
            return
          }

          const newSemesterState = {
            ...semesterState,
          }

          semesterData.sectors[0] = sectorData

          setSemesterState(newSemesterState)
        }}
      />

      {currentSector !== undefined && semesterData.sectors[currentSector] !== undefined ? (
        <SectorTable
          sectorData={semesterData.sectors[currentSector]}
          setSectorData={(sectorData) => {
            const newSemesterState = {
              ...semesterState,
            }

            semesterData.sectors[currentSector] = sectorData

            setSemesterState(newSemesterState)
          }}
        />
      ) : null}

      <br />
      <Typography variant="h6" color="textPrimary">
        Moyenne du semestre {semesterIndex + 1} : {averageState ?? 'N/A'}
      </Typography>
    </>
  )
}

export default Semester
