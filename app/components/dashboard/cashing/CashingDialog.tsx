import { invalidateQuery } from 'blitz'
import NoSsr from '@mui/material/NoSsr'
import Dialog from '@mui/material/Dialog'
import { useSwipeable } from 'react-swipeable'
import { lazy, Suspense, useState } from 'react'
import TabPanel from '@mui/lab/TabPanel'
import Skeleton from '@mui/material/Skeleton'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import DialogContent from '@mui/material/DialogContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogActions from '@mui/material/DialogActions'
import BottomNavigation from '@mui/material/BottomNavigation'
import CircularProgress from '@mui/material/CircularProgress'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import Euro from '@mui/icons-material/EuroTwoTone'
import Close from '@mui/icons-material/CloseTwoTone'
import HistoryIcon from '@mui/icons-material/HistoryTwoTone'
import ShoppingCart from '@mui/icons-material/ShoppingCartTwoTone'

import { useTheme } from 'app/core/styles/theme'
import getUser from 'app/entities/users/queries/getUser'
import getUsers from 'app/entities/users/queries/getUsers'
import SearchUser from 'app/components/dashboard/cashing/SearchUser'
import Balance from 'app/components/hub/transactions/display/Balance'
import getTransactions from 'app/entities/transactions/queries/getTransactions'
import HistoryHeader from 'app/components/hub/transactions/operations/history/HistoryHeader'
import HistoryFilter from 'app/components/hub/transactions/operations/history/HistoryFilter'

const Catalog = lazy(() => import('./catalog/Catalog'))
const AdminTransfer = lazy(() => import('./adminTransfer/AdminTransfer'))
const History = lazy(() => import('app/components/hub/transactions/operations/history/History'))

export default function CashingDialog({ user, onSelection, onClear }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'))

  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)

  const [minDate, setMinDate] = useState(new Date('01-01-2021'))
  const [maxDate, setMaxDate] = useState(new Date())

  const onChange = (_, newValue: number) => setValue(newValue)

  const handlers = useSwipeable({
    onSwipedLeft: () => setValue(value > 1 ? value : value + 1),
    onSwipedRight: () => setValue(value < 1 ? value : value - 1),
  })

  const onTransactionComplete = () => {
    invalidateQuery(getUser, { where: { id: user?.id } })
    invalidateQuery(getTransactions)
  }

  return (
    <NoSsr>
      <TabContext value={value.toString()}>
        {user && (
          <Dialog
            open={Boolean(user)}
            classes={{ paper: 'h-full' }}
            fullScreen={fullScreen}
            keepMounted
            fullWidth
            onClose={onClear}
            PaperProps={{ className: 'w-full' }}
            aria-labelledby="cashing-dialog-title"
            aria-describedby="cashing-dialog-description"
            {...handlers}
          >
            <DialogActions className="flex flex-col">
              <IconButton
                className="ml-auto"
                onClick={onClear}
                aria-label="Fermer l'encaisseur"
                size="large"
              >
                <Close />
              </IconButton>

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

              <Suspense fallback={<Skeleton width="60%" height={55} />}>
                <Balance getQuery={getUser} queryArgs={{ where: { id: user?.id } }} variant="h6" />
              </Suspense>
            </DialogActions>

            <DialogContent className="p-0 text-center">
              <TabPanel className="h-5/6 mb-14" value="0">
                <Suspense
                  fallback={
                    <CircularProgress className="text-primary dark:text-secondary" size={25} />
                  }
                >
                  <Catalog user={user} onTransactionComplete={onTransactionComplete} />
                </Suspense>
              </TabPanel>

              <TabPanel value="1">
                <Suspense
                  fallback={
                    <CircularProgress className="text-primary dark:text-secondary" size={25} />
                  }
                >
                  <HistoryHeader />
                  <History userId={user?.id} minDate={minDate} maxDate={maxDate} />
                </Suspense>
              </TabPanel>

              <TabPanel value="2">
                <Suspense
                  fallback={
                    <CircularProgress className="text-primary dark:text-secondary" size={25} />
                  }
                >
                  <AdminTransfer user={user} onTransactionComplete={onTransactionComplete} />
                </Suspense>
              </TabPanel>
            </DialogContent>

            {value === 1 && (
              <DialogActions>
                <HistoryFilter
                  minDate={minDate}
                  setMinDate={setMinDate}
                  maxDate={maxDate}
                  setMaxDate={setMaxDate}
                />
              </DialogActions>
            )}

            <DialogActions className="p-0">
              <BottomNavigation
                className="w-full"
                showLabels={!fullScreen}
                value={value}
                onChange={onChange}
              >
                <BottomNavigationAction
                  className="text-primary dark:text-secondary"
                  value={0}
                  label="Encaisser"
                  icon={<ShoppingCart />}
                />
                <BottomNavigationAction
                  className="text-primary dark:text-secondary"
                  value={1}
                  label="Historique"
                  icon={<HistoryIcon />}
                />
                <BottomNavigationAction
                  className="text-primary dark:text-secondary"
                  value={2}
                  label="Transférer"
                  icon={<Euro />}
                />
              </BottomNavigation>
            </DialogActions>
          </Dialog>
        )}
      </TabContext>
    </NoSsr>
  )
}
