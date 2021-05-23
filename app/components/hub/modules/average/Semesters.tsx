import React, { useContext } from "react"
import Typography from "@material-ui/core/Typography"
import SectorTable from "./SectorTable"
import { AverageContext } from "./AverageForm"
import { SemesterData } from "./mcc_data/AverageDataTypes"

function Semester(props: { yearIndex: number; semesterIndex: number; sectorIndex: number }) {
  const { yearIndex, semesterIndex, sectorIndex } = props

  return (
    <React.Fragment>
      <Typography variant="subtitle1">Semestre {semesterIndex + 1}</Typography>

      <SectorTable yearIndex={yearIndex} semesterIndex={semesterIndex} sectorIndex={0} />

      {sectorIndex !== 0 ? (
        <SectorTable
          yearIndex={yearIndex}
          semesterIndex={semesterIndex}
          sectorIndex={sectorIndex}
        />
      ) : null}
    </React.Fragment>
  )
}

export default function Semesters(props: { yearIndex: number; sectorIndex: number }) {
  const { yearIndex, sectorIndex } = props

  const averageContext = useContext(AverageContext)
  const year = averageContext.data[yearIndex]

  return (
    <>
      {year.semesters.map((semester, semesterIndex) => (
        <>
          <br />
          <Semester
            key={"semester" + semesterIndex}
            yearIndex={yearIndex}
            semesterIndex={semesterIndex}
            sectorIndex={sectorIndex}
          />
        </>
      ))}
    </>
  )
}
