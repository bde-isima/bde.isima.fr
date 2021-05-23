import React, { useContext, useState } from "react"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { TextField } from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment"
import { AverageContext } from "./AverageForm"

function Subject(props: {
  yearIndex: number
  semesterIndex: number
  sectorIndex: number
  ueIndex: number
  subjectIndex: number
}) {
  const { yearIndex, semesterIndex, sectorIndex, ueIndex, subjectIndex } = props

  const averageContext = useContext(AverageContext)
  const subject =
    averageContext.data[yearIndex].semesters[semesterIndex].sectors[sectorIndex].ues[ueIndex]
      .subjects[subjectIndex]

  const [mark, setMark] = useState<number | undefined>(subject.mark)

  const handleMarkChange = (event) => {
    if (event.target.valueAsNumber >= 0 && event.target.valueAsNumber <= 20) {
      const newMark: number = event.target.valueAsNumber

      averageContext.updateData(
        yearIndex,
        semesterIndex,
        sectorIndex,
        ueIndex,
        subjectIndex,
        newMark
      )
      setMark(newMark)
    } else if (event.target.value == "") {
      setMark(undefined)
    }
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {subject.name}
      </TableCell>
      <TableCell>{subject.coef}</TableCell>
      <TableCell align="right">
        <TextField
          label="Note"
          id="filled-start-adornment"
          value={mark}
          onChange={handleMarkChange}
          type={"number"}
          InputProps={{
            endAdornment: <InputAdornment position="end">/ 20</InputAdornment>,
          }}
        />
      </TableCell>
    </TableRow>
  )
}

export default Subject
