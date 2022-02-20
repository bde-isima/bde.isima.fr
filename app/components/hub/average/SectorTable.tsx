import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { useState, useContext } from 'react'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUpTwoTone'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDownTwoTone'

import Subject from './Subject'
import { AverageContext } from './AverageForm'

function UERow(props: {
  yearIndex: number
  semesterIndex: number
  sectorIndex: number
  ueIndex: number
}) {
  const { yearIndex, semesterIndex, sectorIndex, ueIndex } = props

  const [open, setOpen] = useState(false)
  const averageContext = useContext(AverageContext)
  const ue =
    averageContext.data[yearIndex].semesters[semesterIndex].sectors[sectorIndex].ues[ueIndex]

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {ue.name}
        </TableCell>
        <TableCell align={'center'}>{ue.average ?? 'N/A'}</TableCell>
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
                        'sem_' +
                        semesterIndex +
                        'sect_' +
                        sectorIndex +
                        '_ue_' +
                        ueIndex +
                        '_subj_' +
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
                      {ue.average ?? 'N/A'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
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
              <TableCell align={'center'}>Moyenne</TableCell>
              <TableCell align="right">ETC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sector.ues.map((ue, ueIndex) => (
              <UERow
                key={'sem_' + semesterIndex + 'sect_' + sectorIndex + '_ue_' + ueIndex}
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
              <TableCell component="th" scope="row" align={'center'}>
                {sector.average ?? 'N/A'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
