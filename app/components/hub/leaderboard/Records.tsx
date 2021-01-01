import Card from "@material-ui/core/Card"
import Badge from '@material-ui/core/Badge'
import Table from "@material-ui/core/Table"
import Avatar from "@material-ui/core/Avatar"
import TableRow from "@material-ui/core/TableRow"
import Skeleton from "@material-ui/core/Skeleton"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import CardContent from "@material-ui/core/CardContent"

import CrownOutline from 'mdi-material-ui/CrownOutline'
import { useCurrentUser } from "app/hooks/useCurrentUser"

function Records({ leaderboard, isFetching }) {
    const [user, { isFetching: isFetchingUser }] = useCurrentUser({
        include: { userStats: true },
    })

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
                        {(isFetching || isFetchingUser) && [...Array(10).keys()].map((x) => (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Skeleton key={x} height={40} width="100%" />
                                </TableCell>
                            </TableRow>
                        ))}

                        {(!isFetching && !isFetchingUser) && leaderboard.data.map(row => {
                            const score = (user as any).userStats?.articlesStats[row.articleId] ?? 0
                            return (
                                <TableRow key={row.articleName}>
                                    <TableCell align="right"><Avatar src={row.articleImage} alt={`Image de ${row.articleName}`} /></TableCell>
                                    <TableCell component="th" scope="row" align="right">{row.articleName}</TableCell>
                                    <TableCell align="right">{row.unitsNb}</TableCell>
                                    <TableCell align="right">
                                        <div className="flex justify-end items-center">
                                            {row.leaderName}
                                            {row.leaderImage && <Avatar className="ml-2" src={row.leaderImage} alt={`Image de ${row.leaderName}`} />}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        {(score >= row.unitsNb) ? (
                                            <Badge badgeContent={<CrownOutline className="transform-gpu -translate-y-1 rotate-12 text-yellow-300" />} component="span">
                                                {score}
                                            </Badge>
                                        ) : score }
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default Records