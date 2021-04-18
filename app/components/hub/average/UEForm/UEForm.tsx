import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TextField from "@material-ui/core/TextField"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

import { UEData } from "../AverageData"

import { createUEData } from "./UEData"

interface Column {
  id: "subject" | "coefficient" | "mark" | "average"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

const columns: Column[] = [
  {
    id: "subject",
    label: "Matières",
    minWidth: 100,
  },
  {
    id: "coefficient",
    label: "Coefficients",
    minWidth: 100,
  },
  {
    id: "mark",
    label: "Notes",
    minWidth: 150,
    format: (value: number) => value.toLocaleString("fr-FR"),
  },
]

const useStyles = makeStyles({
  root: {
    // width: '100%',
  },
  container: {
    maxHeight: "50em",
  },
})

interface UEFormData {
  average: number | null
  rows: ReturnType<typeof createUEData>[]
}

export default function UEForm(props: { name: string; data: UEData }) {
  const [data, setData] = useState<UEFormData>({
    average: null,
    rows: props.data.subjects.map((data) => {
      return createUEData(data.name, data.name, data.coefficient, data.mark)
    }),
  })

  const classes = useStyles()

  const onChange = (value) => {
    let updated_rows = [...data.rows]
    let average = 0
    let coefficients_sum = 0

    for (const row_index in data.rows) {
      // console.log(value);
      // console.log(data.rows[row_index].mark);
      if (value.target.id === data.rows[row_index].id) {
        updated_rows[row_index].mark = value.target.valueAsNumber
      } else if (data.rows[row_index].mark === null) {
        return
      }

      // @ts-ignore
      average += data.rows[row_index].mark * data.rows[row_index].coefficient
      coefficients_sum += data.rows[row_index].coefficient
    }

    setData({
      average: Math.round((average / coefficients_sum) * 1000) / 1000,
      rows: updated_rows,
    })
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rows.map((row) => {
              // console.log("Row " + row.id);
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id + "-row"}>
                  {columns.map((column) => {
                    const value = row[column.id]

                    const content = ((column) => {
                      if (column.id === "mark") {
                        return (
                          <TextField
                            id={row.id}
                            label={"Note"}
                            type={"number"}
                            value={row.mark}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={onChange}
                          />
                        )
                      } else {
                        return column.format && typeof value === "number"
                          ? column.format(value)
                          : value
                      }
                    })(column)

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {content}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}

            <TableRow hover role="checkbox" tabIndex={-1} key={"avg-row"}>
              <TableCell key={"avg-label"} align={"center"} colSpan={2}>
                <b>Moyenne</b>
              </TableCell>
              <TableCell key={"avg-cell"} align={"left"}>
                {data.average === null ? (
                  "Toutes les notes ne sont pas saisies"
                ) : (
                  <b>{data.average}</b>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
