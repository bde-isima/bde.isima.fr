import { setQueryData } from 'blitz'
import { useTheme } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import { useSwipeable } from 'react-swipeable'
import TabContext from '@material-ui/lab/TabContext'
import DialogContent from '@material-ui/core/DialogContent'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import DialogActions from '@material-ui/core/DialogActions'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { lazy, Suspense, unstable_SuspenseList, useState, SyntheticEvent } from 'react'

import HistoryIcon from 'mdi-material-ui/History'
import CurrencyEur from 'mdi-material-ui/CurrencyEur'
import CartOutline from 'mdi-material-ui/CartOutline'

import TabPanel from 'app/layouts/TabPanel'
import getUsers from 'app/entities/users/queries/getUsers'
import SearchUser from 'app/components/dashboard/cashing/SearchUser'
import Balance from 'app/components/hub/transactions/display/Balance'
import HistoryHeader from '../../hub/transactions/operations/history/HistoryHeader'

const SuspenseList = unstable_SuspenseList
const Catalog = lazy(() => import('./catalog/Catalog'))
const AdminTransfer = lazy(() => import('./adminTransfer/AdminTransfer'))
const History = lazy(() => import('app/components/hub/transactions/operations/history/History'))

export default function CashingDialog({ user, onSelection, onClear }) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const [value, setValue] = useState(0)
    const [open, setOpen] = useState(false)

    const onChange = (event: SyntheticEvent, newValue: number) => setValue(newValue)

    const handlers = useSwipeable({
        onSwipedLeft: () => setValue(value > 1 ? value : value + 1),
        onSwipedRight: () => setValue(value < 1 ? value : value - 1),
    })

    const updateBalance = amount => {
        setQueryData(getUsers, { where: { is_enabled: true } }, (oldData: any) => {
            const newData = { ...oldData }
            const userIdx = newData.users.findIndex(x => x.id === user.id)
            newData.users[userIdx].balance += amount
            onSelection(null, { ...newData.users[userIdx] })
            return newData
        }, { refetch: false })
    } 

    return (
        <TabContext value={value.toString()}>
            <Dialog
                open={Boolean(user)}
                classes={{ paper: "h-full" }}
                fullScreen={fullScreen}
                keepMounted
                fullWidth
                onClose={onClear}
                aria-labelledby="cashing-dialog-title"
                aria-describedby="cashing-dialog-description"
                {...handlers}
            >
                <DialogActions className="flex flex-col">
                    <SearchUser
                        name="user"
                        className="w-full m-4"
                        label="Encaisser un membre ..."
                        onSelection={onSelection}
                        getQuery={getUsers}
                        value={user}
                        open={open}
                        setOpen={setOpen}
                    />

                    {user && (
                        <Balance balance={user?.balance || 0} variant="h6" />
                    )}
                </DialogActions>

                <DialogContent className="flex flex-col p-0">
                    <SuspenseList revealOrder="forwards">
                        <Suspense fallback={null}>
                            <TabPanel className="h-full" value="0">
                                <Catalog user={user} updateBalance={updateBalance} /> 
                            </TabPanel>
                        </Suspense>

                        <Suspense fallback={null}>
                            <TabPanel value="1">
                                <HistoryHeader />
                                <History userId={user?.id} />
                            </TabPanel>
                        </Suspense>

                        <Suspense fallback={null}>
                            <TabPanel value="2">
                                <AdminTransfer user={user} updateBalance={updateBalance} />
                            </TabPanel>
                        </Suspense>
                    </SuspenseList>
                </DialogContent>

                <DialogActions className="p-0">
                    <BottomNavigation className="w-full" showLabels={!fullScreen} value={value} onChange={onChange}>
                        <BottomNavigationAction value={0} label="Encaisser" icon={<CartOutline />} />
                        <BottomNavigationAction value={1} label="Historique" icon={<HistoryIcon />} />
                        <BottomNavigationAction value={2} label="Transférer" icon={<CurrencyEur />} />
                    </BottomNavigation>
                </DialogActions>
            </Dialog>
        </TabContext>
    )
}