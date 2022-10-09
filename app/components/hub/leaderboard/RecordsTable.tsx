import { Suspense } from 'react'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import Skeleton from '@mui/material/Skeleton'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import Records from 'app/components/hub/leaderboard/Records'

export default function RecordsTable() {
  const FallbackComponent = [...Array(10).keys()].map((x) => (
    <TableRow key={x}>
      <TableCell colSpan={5}>
        <Skeleton height={40} width="100%" />
      </TableCell>
    </TableRow>
  ))

  return (
    <TableContainer className="md:overflow-hidden" aria-label="Tableau des records">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Photo</TableCell>
            <TableCell align="right">Article</TableCell>
            <TableCell align="right">Nombre d&apos;unités</TableCell>
            <TableCell align="right">Nom d&apos;utilisateur</TableCell>
            <TableCell align="right">Votre score</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <Suspense fallback={FallbackComponent}>
            <Records />
          </Suspense>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
