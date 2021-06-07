import Image from 'next/image'
import { useQuery } from 'blitz'
import Badge from '@material-ui/core/Badge'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import CrownOutline from 'mdi-material-ui/CrownOutline'

import { useCurrentUser } from 'app/entities/hooks/useCurrentUser'
import getAnalytic from 'app/entities/analytic/queries/getAnalytic'

export default function Records() {
  const [user] = useCurrentUser({
    include: { userStats: true },
  })

  const [leaderboard] = useQuery(getAnalytic, {
    where: { tag: 'leaderboard' },
  })

  return (
    <>
      {(leaderboard as any)?.data?.map((row) => {
        const score = (user as any)?.userStats?.articlesStats[row.articleId] ?? 0
        return (
          <TableRow key={row.articleName}>
            <TableCell align="right">
              {row.articleImage && (
                <Image
                  className="rounded-full"
                  src={row.articleImage}
                  width={40}
                  height={40}
                  alt={`Image de ${row.articleName}`}
                />
              )}
            </TableCell>
            <TableCell component="th" scope="row" align="right">
              {row.articleName}
            </TableCell>
            <TableCell align="right">{row.unitsNb}</TableCell>
            <TableCell align="right">
              <div className="flex justify-end items-center">
                {row.leaderName}
                {row.leaderImage && (
                  <div className="ml-2">
                    <Image
                      className="rounded-full"
                      src={row.leaderImage}
                      width={40}
                      height={40}
                      alt={`Image de ${row.leaderName}`}
                    />
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell align="right">
              {score >= row.unitsNb && row.unitsNb > 0 ? (
                <Badge
                  badgeContent={
                    <CrownOutline className="transform-gpu -translate-y-1 rotate-12 text-yellow-300" />
                  }
                  component="span"
                >
                  {score}
                </Badge>
              ) : (
                score
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
