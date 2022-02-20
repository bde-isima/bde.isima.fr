import { useEffect, useState } from 'react'
import { YearData } from 'global'
import Semester from './Semester'

interface SemestersPropsType {
  yearData: YearData
  setYearData: (yearData: YearData) => void
}

const Year = ({ yearData, setYearData }: SemestersPropsType) => {
  const [yearState, setYearState] = useState(yearData)
  const [averageState, setAverageState] = useState(yearData.average)

  useEffect(() => {
    if (yearData !== yearState) {
      setYearState(yearData)
    }
  }, [yearData])

  useEffect(() => {
    setYearData({
      ...yearState,
      average: averageState,
    })
  }, [averageState])

  useEffect(() => {
    setAverageState(computeYearAverage(yearState))
  }, [yearState])

  const computeYearAverage = ({ semesters }: YearData): number | undefined => {
    let yearAverage = 0
    let sum = 0

    for (const semesterIndex in semesters) {
      const average = semesters[semesterIndex].average

      if (average === undefined) {
        continue
      }

      yearAverage += average
      sum++
    }

    if (sum === 0) {
      return undefined
    }

    yearAverage /= sum

    return Math.round(yearAverage * 1000) / 1000
  }

  return (
    <>
      {yearState.semesters.map((semester, semesterIndex) => (
        <Semester
          key={'semester' + semesterIndex}
          semesterIndex={semesterIndex}
          semesterData={semester}
          setSemesterData={(semesterData) => {
            const newYearState = {
              ...yearState,
            }

            yearState.semesters[semesterIndex] = semesterData

            setYearState(newYearState)
          }}
        />
      ))}
    </>
  )
}

export default Year
