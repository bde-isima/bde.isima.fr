import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import ChevronDown from "mdi-material-ui/ChevronDown"
import ChevronUp from "mdi-material-ui/ChevronUp"
import { UEData } from "./data/AverageDataTypes"

import Subjects from "./Subjects"

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
})

interface SectorTableProps {
  name: String
  ues: UEData[]
}

function UE(props: { ue: UEData }) {
  const { ue } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {ue.name}
        </TableCell>
        <TableCell align="right">{ue.ects}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Subjects subjects={ue.subjects} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function SectorTable(props: SectorTableProps) {
  return (
    <>
      <Typography className="pl-4 pt-4" variant="subtitle1">
        {props.name}
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nom UE</TableCell>
              <TableCell align="right">ETCs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.ues.map((ue) => (
              <UE ue={ue} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
