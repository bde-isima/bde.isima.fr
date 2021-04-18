import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import MenuUp from "mdi-material-ui/MenuUp"
import MenuDown from "mdi-material-ui/MenuDown"

import { UEData } from "./AverageData"
import UEForm from "./UEForm/UEForm"

const useRowStyles = makeStyles({
  root: {
    width: "86em",
    marginLeft: "-1em",
  },
})

function UETableRow(props: { row: UEData }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <MenuUp /> : <MenuDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit classes={classes}>
            <UEForm name={row.name} data={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function UETable(props: { name: string; rows: UEData[] }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell
              width={"1px"} // Very small width to fit content
            />
            <TableCell align={"left"}>{props.name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <UETableRow key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
