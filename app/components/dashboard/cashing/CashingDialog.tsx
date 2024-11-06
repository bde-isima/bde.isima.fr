import { Suspense, lazy, useEffect, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import NoSsr from '@mui/material/NoSsr';
import Skeleton from '@mui/material/Skeleton';
import { useSwipeable } from 'react-swipeable';

import Close from '@mui/icons-material/CloseTwoTone';
import Euro from '@mui/icons-material/EuroTwoTone';
import HistoryIcon from '@mui/icons-material/HistoryTwoTone';
import ShoppingCart from '@mui/icons-material/ShoppingCartTwoTone';
import Logout from '@mui/icons-material/Logout';


import { useAuthenticatedSession } from '@blitzjs/auth';
import { invalidateQuery } from '@blitzjs/rpc';

import SearchUser from 'app/components/dashboard/cashing/SearchUser';
import Balance from 'app/components/hub/transactions/display/Balance';
import HistoryFilter from 'app/components/hub/transactions/operations/history/HistoryFilter';
import HistoryHeader from 'app/components/hub/transactions/operations/history/HistoryHeader';
import { useMediaQuery } from 'app/core/styles/theme';
import { isTroll } from 'app/core/utils/listeux_or_troll';
import getTransactions from 'app/entities/transactions/queries/getTransactions';
import getUser from 'app/entities/users/queries/getUser';
import getUsers from 'app/entities/users/queries/getUsers';
import Adherent from 'app/components/hub/transactions/display/Adherent';

const Catalog = lazy(() => import('./catalog/Catalog'));
const AdminTransfer = lazy(() => import('./adminTransfer/AdminTransfer'));
const History = lazy(() => import('app/components/hub/transactions/operations/history/History'));

export default function CashingDialog({ user, onSelection, onClear, onDisconnect }) {
  const fullScreen = useMediaQuery('md');
  const session = useAuthenticatedSession();

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const [minDate, setMinDate] = useState(new Date('01-01-2021'));
  const [maxDate, setMaxDate] = useState(new Date());

  const onChange = (_, newValue: number) => setValue(newValue);

  const handlers = useSwipeable({
    onSwipedLeft: () => setValue(value > 1 ? value : value + 1),
    onSwipedRight: () => setValue(value < 1 ? value : value - 1)
  });

  const onTransactionComplete = async () => {
    await invalidateQuery(getUser, { where: { id: user?.id } });
    await invalidateQuery(getTransactions);
  };

  useEffect(() => {
    if (Boolean(user) && value == 0 && isTroll(session)) {
      const timer = setTimeout(() => {
        onClear(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  });

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
            <DialogActions className="flex flex-row">
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

              <IconButton onClick={onDisconnect} aria-label="Deconnecter l'utilisateur" size="large">
                <Logout />
              </IconButton>
              <IconButton className="ml-auto" onClick={onClear} aria-label="Fermer l'encaisseur" size="large">
                <Close />
              </IconButton>
            </DialogActions>

            <Suspense fallback={<Skeleton width="50%" height={55} />}>
                <Adherent getQuery={getUser} queryArgs={{ where: { id: user?.id } }} />
              </Suspense>

            <DialogContent className="p-0 text-center">
              <Suspense fallback={<Skeleton width="60%" height={55} />}>
                <Balance getQuery={getUser} queryArgs={{ where: { id: user?.id } }} variant="h6" />
              </Suspense>

              <TabPanel className="h-5/6 mb-14" value="0">
                <Suspense fallback={<CircularProgress size={25} />}>
                  <Catalog user={user} onTransactionComplete={onTransactionComplete} />
                </Suspense>
              </TabPanel>

              <TabPanel value="1">
                <Suspense fallback={<CircularProgress size={25} />}>
                  <HistoryHeader />
                  <History userId={user?.id} minDate={minDate} maxDate={maxDate} />
                </Suspense>
              </TabPanel>

              <TabPanel value="2">
                <Suspense fallback={<CircularProgress size={25} />}>
                  <AdminTransfer user={user} onTransactionComplete={onTransactionComplete} />
                </Suspense>
              </TabPanel>
            </DialogContent>

            {value === 1 && (
              <DialogActions>
                <HistoryFilter minDate={minDate} setMinDate={setMinDate} maxDate={maxDate} setMaxDate={setMaxDate} />
              </DialogActions>
            )}

            <DialogActions className="p-0">
              <BottomNavigation className="w-full" showLabels={!fullScreen} value={value} onChange={onChange}>
                <BottomNavigationAction value={0} label="Encaisser" icon={<ShoppingCart />} />
                <BottomNavigationAction value={1} label="Historique" icon={<HistoryIcon />} />
                <BottomNavigationAction value={2} label="Transférer" icon={<Euro />} />
              </BottomNavigation>
            </DialogActions>
          </Dialog>
        )}
      </TabContext>
    </NoSsr>
  );
}
