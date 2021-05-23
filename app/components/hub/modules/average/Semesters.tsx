import React, { useContext } from "react"
import Typography from "@material-ui/core/Typography"
import SectorTable from "./SectorTable"
import { AverageContext } from "./AverageForm"

function Semester(props: { yearIndex: number; semesterIndex: number; sectorIndex: number }) {
  const { yearIndex, semesterIndex, sectorIndex } = props

  const averageContext = useContext(AverageContext)
  const semester = averageContext.data[yearIndex].semesters[semesterIndex]

  return (
    <>
      <br key={"semester_index_" + semesterIndex} />

      <Typography key={"semester_title_" + semesterIndex} variant="h4">
        Semestre {semesterIndex + 1}
      </Typography>

      <SectorTable
        key={"semester_sector_common_" + semesterIndex}
        yearIndex={yearIndex}
        semesterIndex={semesterIndex}
        sectorIndex={0}
      />

      {sectorIndex !== 0 ? (
        <SectorTable
          key={"semester_sector_" + semesterIndex}
          yearIndex={yearIndex}
          semesterIndex={semesterIndex}
          sectorIndex={sectorIndex}
        />
      ) : null}

      <br />
      <Typography key={"semester_avg_" + semesterIndex} variant="h6">
        Moyenne du semestre {semesterIndex + 1} : {semester.average ?? "N/A"}
      </Typography>
    </>
  )
}

export default function Semesters(props: { yearIndex: number; sectorIndex: number }) {
  const { yearIndex, sectorIndex } = props

  const averageContext = useContext(AverageContext)
  const year = averageContext.data[yearIndex]

  return (
    <>
      <br />
      {year.semesters.map((semester, semesterIndex) => (
        <Semester
          key={"semester_" + semesterIndex}
          yearIndex={yearIndex}
          semesterIndex={semesterIndex}
          sectorIndex={sectorIndex}
        />
      ))}
    </>
  )
}
