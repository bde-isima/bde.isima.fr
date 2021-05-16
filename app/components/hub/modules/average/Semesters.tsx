import React from "react"
import Typography from "@material-ui/core/Typography"
import { SemesterData, Year } from "./data/AverageDataTypes"
import SectorTable from "./SectorTable"

function Semester(props: { semester: SemesterData; number: Number; sectorIndex: number }) {
  const { semester, number, sectorIndex } = props

  const sector = (() => {
    if (semester.sectors) {
      const sector = semester.sectors[sectorIndex]

      return <SectorTable name={sector.name} ues={sector.ues} />
    } else {
      return null
    }
  })()

  return (
    <React.Fragment>
      <Typography variant="subtitle1">Semestre {number}</Typography>

      {semester.ues ? <SectorTable name={"Tronc commun"} ues={semester.ues} /> : null}

      {sector}
    </React.Fragment>
  )
}

interface SemestersTableProps {
  year: Year
  sectorIndex: number
}

export default function Semesters(props: SemestersTableProps) {
  const { year, sectorIndex } = props

  return (
    <>
      {year.semesters.map((semester, index) => {
        return (
          <>
            <br />
            <Semester
              key={"semester" + index}
              semester={semester}
              number={index + 1}
              sectorIndex={sectorIndex}
            />
          </>
        )
      })}
    </>
  )
}
