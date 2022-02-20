import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'

import { SectorData, UEData } from 'constants/modules/average/types'
import UeTable from './UeTable'

interface SectorTablePropsType {
  sectorData: SectorData
  setSectorData: (sectorData: SectorData) => void
}

export default function SectorTable({ sectorData, setSectorData }: SectorTablePropsType) {
  const [sectorState, setSectorState] = useState(sectorData)
  const [averageState, setAverageState] = useState(sectorState.average)

  const computeSectorAverage = (ues: UEData[]): number | undefined => {
    let sectorAverage = 0
    let sum = 0

    for (const ueIndex in ues) {
      const average = ues[ueIndex].average

      if (average === undefined) {
        continue
      }

      sectorAverage += average
      sum++
    }

    if (sum === 0) {
      return undefined
    }

    sectorAverage /= sum

    return Math.round(sectorAverage * 1000) / 1000
  }

  useEffect(() => {
    setSectorData({
      ...sectorState,
      average: averageState,
    })
  }, [averageState])

  useEffect(() => {
    setAverageState(computeSectorAverage(sectorState.ues))
  }, [sectorState])

  return (
    <>
      <Typography className="pl-4 pt-4" variant="h6" color="textPrimary">
        {sectorState.name}
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
            {sectorState.ues.map((ue, ueIndex) => (
              <UeTable
                key={`ue-${ueIndex}`}
                ueData={ue}
                setUeData={(ueData: UEData) => {
                  const newSectorState = {
                    ...sectorState,
                  }

                  newSectorState.ues[ueIndex] = ueData

                  setSectorState(newSectorState)
                }}
              />
            ))}
            <TableRow>
              <TableCell component="th" scope="row" />
              <TableCell component="th" scope="row">
                Moyenne
              </TableCell>
              <TableCell component="th" scope="row" align={'center'}>
                {averageState ?? 'N/A'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
