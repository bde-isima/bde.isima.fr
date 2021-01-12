import { Suspense } from "react"
import Card from "@material-ui/core/Card"
import Table from "@material-ui/core/Table"
import TableRow from "@material-ui/core/TableRow"
import Skeleton from "@material-ui/core/Skeleton"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import CardContent from "@material-ui/core/CardContent"

import Records from "app/components/hub/leaderboard/Records"

export default function RecordsTable({ leaderboard }) {
  const FallbackComponent = [...Array(10).keys()].map((x) => (
    <TableRow>
      <TableCell colSpan={5}>
        <Skeleton key={x} height={40} width="100%" />
      </TableCell>
    </TableRow>
  ))

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Photo</TableCell>
              <TableCell align="right">Article</TableCell>
              <TableCell align="right">Nombre d'unités</TableCell>
              <TableCell align="right">Nom d'utilisateur</TableCell>
              <TableCell align="right">Votre score</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <Suspense fallback={FallbackComponent}>
              <Records leaderboard={leaderboard} />
            </Suspense>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}