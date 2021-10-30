import React, { useEffect, useState } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import { SubjectData } from 'constants/modules/average/types'

interface SubjectPropsType {
  subjectData: SubjectData
  setSubjectData: (subjectData: SubjectData) => void
}

function Subject({ subjectData, setSubjectData }: SubjectPropsType) {
  const [subjectState, setSubjectState] = useState(subjectData)
  const [markState, setMarkState] = useState<string>(
    subjectState.mark ? subjectState.mark.toString() : ''
  )

  useEffect(() => {
    setSubjectData(subjectState)
  }, [subjectState])

  useEffect(() => {
    const newSubjectState = {
      ...subjectState,
    }
    if (markState === '') {
      newSubjectState.mark = undefined
    } else {
      newSubjectState.mark = Number.parseInt(markState)

      if (newSubjectState.mark < 0) {
        newSubjectState.mark = 0
        setMarkState('0')
      } else if (newSubjectState.mark > 20) {
        newSubjectState.mark = 20
        setMarkState('20')
      }
    }

    setSubjectState(newSubjectState)
  }, [markState])

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {subjectData.name}
      </TableCell>
      <TableCell>{subjectData.coef}</TableCell>
      <TableCell align="right">
        <TextField
          label="Note"
          id="filled-start-adornment"
          value={markState}
          onChange={(evt) => setMarkState(evt.target.value)}
          type={'number'}
          InputProps={{
            endAdornment: <InputAdornment position="end">/ 20</InputAdornment>,
          }}
        />
      </TableCell>
    </TableRow>
  )
}

export default Subject
