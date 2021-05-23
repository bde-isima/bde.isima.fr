import React, { useContext } from "react"
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
import { AverageContext } from "./AverageForm"
import Box from "@material-ui/core/Box"
import Subject from "./Subject"

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
})

function UERow(props: {
  yearIndex: number
  semesterIndex: number
  sectorIndex: number
  ueIndex: number
}) {
  const { yearIndex, semesterIndex, sectorIndex, ueIndex } = props

  const averageContext = useContext(AverageContext)
  const ue =
    averageContext.data[yearIndex].semesters[semesterIndex].sectors[sectorIndex].ues[ueIndex]

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
        <TableCell align={"center"}>{ue.average ?? "N/A"}</TableCell>
        <TableCell align="right">{ue.ects}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
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
                  {ue.subjects.map((subject, subjectIndex) => (
                    <Subject
                      key={
                        "sem_" +
                        semesterIndex +
                        "sect_" +
                        sectorIndex +
                        "_ue_" +
                        ueIndex +
                        "_subj_" +
                        subjectIndex
                      }
                      yearIndex={yearIndex}
                      semesterIndex={semesterIndex}
                      sectorIndex={sectorIndex}
                      ueIndex={ueIndex}
                      subjectIndex={subjectIndex}
                    />
                  ))}
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Moyenne
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {ue.average ?? "N/A"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function SectorTable(props: {
  yearIndex: number
  semesterIndex: number
  sectorIndex: number
}) {
  const { yearIndex, semesterIndex, sectorIndex } = props

  const averageContext = useContext(AverageContext)
  const sector = averageContext.data[yearIndex].semesters[semesterIndex].sectors[sectorIndex]

  if (sector == null) {
    return null
  }

  return (
    <>
      <Typography className="pl-4 pt-4" variant="subtitle1">
        {sector.name}
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nom UE</TableCell>
              <TableCell align={"center"}>Moyenne</TableCell>
              <TableCell align="right">ETC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sector.ues.map((ue, ueIndex) => (
              <UERow
                key={"sem_" + semesterIndex + "sect_" + sectorIndex + "_ue_" + ueIndex}
                yearIndex={yearIndex}
                semesterIndex={semesterIndex}
                sectorIndex={sectorIndex}
                ueIndex={ueIndex}
              />
            ))}
            <TableRow>
              <TableCell component="th" scope="row" />
              <TableCell component="th" scope="row">
                Moyenne de la filière
              </TableCell>
              <TableCell component="th" scope="row" align={"center"}>
                {sector.average ?? "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
