import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import IconButton from '@mui/material/IconButton'

import { SubjectData, UEData } from 'global'
import Subject from './Subject'

interface UeTablePropsType {
  ueData: UEData
  setUeData: (ueData: UEData) => void
}

const UeTable = ({ ueData, setUeData }: UeTablePropsType) => {
  const [ueState, setUeState] = useState(ueData)
  const [averageState, setAverageState] = useState(ueState.average)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setUeData({
      ...ueState,
      average: averageState,
    })
  }, [averageState])

  useEffect(() => {
    setAverageState(computeAverage(ueState.subjects))
  }, [ueState])

  const computeAverage = (subjects: SubjectData[]): number | undefined => {
    let average = 0
    let coefSum = 0

    for (const subjectIndex in subjects) {
      const mark = subjects[subjectIndex].mark

      if (mark === undefined) {
        continue
      }

      average += mark * subjects[subjectIndex].coef
      coefSum += subjects[subjectIndex].coef
    }

    if (coefSum === 0) {
      return undefined
    }

    average /= coefSum

    return Math.round(average * 1000) / 1000
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {ueState.name}
        </TableCell>
        <TableCell align={'center'}>{averageState ?? 'N/A'}</TableCell>
        <TableCell align="right">{ueState.ects}</TableCell>
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
                  {ueState.subjects.map((subject, subjectIndex) => (
                    <Subject
                      key={`subject-${subjectIndex}`}
                      subjectData={subject}
                      setSubjectData={(subjectData: SubjectData) => {
                        const newUeState = {
                          ...ueState,
                        }

                        newUeState.subjects[subjectIndex] = subjectData

                        setUeState(newUeState)
                      }}
                    />
                  ))}
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Moyenne
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      {averageState ?? 'N/A'}
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

export default UeTable
