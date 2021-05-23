import React, { useContext } from "react"
import Typography from "@material-ui/core/Typography"
import SectorTable from "./SectorTable"
import { AverageContext } from "./AverageForm"

function Semester(props: { yearIndex: number; semesterIndex: number; sectorIndex: number }) {
  const { yearIndex, semesterIndex, sectorIndex } = props

  const averageContext = useContext(AverageContext)
  const semester = averageContext.data[yearIndex].semesters[semesterIndex]

  return (
    <React.Fragment>
      <br />

      <Typography variant="h4">Semestre {semesterIndex + 1}</Typography>

      <SectorTable yearIndex={yearIndex} semesterIndex={semesterIndex} sectorIndex={0} />

      {sectorIndex !== 0 ? (
        <SectorTable
          yearIndex={yearIndex}
          semesterIndex={semesterIndex}
          sectorIndex={sectorIndex}
        />
      ) : null}

      <br />
      <Typography variant="h6">
        Moyenne du semestre {semesterIndex + 1} : {semester.average ?? "N/A"}
      </Typography>
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
