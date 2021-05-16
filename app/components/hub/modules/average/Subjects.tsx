import { SubjectData } from "./mcc_data/AverageDataTypes"
import React, { useState } from "react"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { TextField } from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment"
import Box from "@material-ui/core/Box"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"

function Subject(props: { subject: SubjectData }) {
  const { subject } = props

  const [mark, setMark] = useState<Number | undefined>(subject.mark)

  const handleMarkChange = (event) => {
    if (event.target.value <= 20) {
      setMark(event.target.value)
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

function Subjects(props: { subjects: SubjectData[] }) {
  const { subjects } = props

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Coefficient</TableCell>
            <TableCell align="right">Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject) => (
            <Subject subject={subject} />
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Subjects
