import { useQuery } from 'blitz'
import NoSsr from '@mui/material/NoSsr'
import Dialog from '@mui/material/Dialog'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import BottomNavigation from '@mui/material/BottomNavigation'
import CircularProgress from '@mui/material/CircularProgress'
import { useState, Suspense, lazy } from 'react'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import Close from '@mui/icons-material/CloseTwoTone'
import Layers from '@mui/icons-material/LayersTwoTone'
import QueryStats from '@mui/icons-material/QueryStatsTwoTone'
import FormatListBulleted from '@mui/icons-material/FormatListBulletedTwoTone'

import TabPanel from 'app/core/layouts/TabPanel'
import { useMediaQuery } from 'app/core/styles/theme'
import SlideTransition from 'app/core/layouts/SlideTransition'
import getEventSubscriptions from 'app/entities/eventSubscriptions/queries/getEventSubscriptions'

const SubscriptionRecap = lazy(() => import('./recap/SubscriptionRecap'))
const SubscriptionsList = lazy(() => import('./list/SubscriptionsList'))
const SubscriptionsAnalytics = lazy(() => import('./analytics/SubscriptionsAnalytics'))

export default function Manager({ open, event, onClose }) {
  const [value, setValue] = useState(0)

  const fullScreen = useMediaQuery('md')

  const [data]: any = useQuery(
    getEventSubscriptions,
    { where: { eventId: event?.id }, include: { user: true } },
    { enabled: Boolean(event?.id), refetchOnWindowFocus: false }
  )

  const onChange = (_, newValue: number) => setValue(newValue)

  return (
    <NoSsr>
      <TabContext value={value.toString()}>
        <Dialog
          open={open}
          onClose={onClose}
          fullScreen
          TransitionComponent={SlideTransition}
          aria-labelledby="manager-dialog-title"
          aria-describedby="manager-dialog-description"
        >
          <DialogTitle className="flex items-center" id="manager-dialog-title">
            <Typography variant="h6" color="inherit">
              Manager d&apos;évènements
            </Typography>

            <IconButton
              className="ml-auto"
              onClick={onClose}
              aria-label="Fermer le manager"
              size="large"
            >
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Suspense fallback={<CircularProgress className="mx-auto" size={25} />}>
              <TabPanel value="0">
                <SubscriptionsAnalytics eventSubscriptions={data?.eventSubscriptions} />
              </TabPanel>
            </Suspense>

            <Suspense fallback={<CircularProgress className="mx-auto" size={25} />}>
              <TabPanel value="1">
                <SubscriptionsList event={event} eventSubscriptions={data?.eventSubscriptions} />
              </TabPanel>
            </Suspense>

            <Suspense fallback={<CircularProgress className="mx-auto" size={25} />}>
              <TabPanel value="2">
                <SubscriptionRecap eventSubscriptions={data?.eventSubscriptions} />
              </TabPanel>
            </Suspense>
          </DialogContent>

          <DialogActions className="p-0">
            <BottomNavigation
              className="w-full"
              showLabels={!fullScreen}
              value={value}
              onChange={onChange}
            >
              <BottomNavigationAction label="Statistiques" icon={<QueryStats />} />
              <BottomNavigationAction label="Liste inscrits" icon={<FormatListBulleted />} />
              <BottomNavigationAction label="Récapitulatif" icon={<Layers />} />
            </BottomNavigation>
          </DialogActions>
        </Dialog>
      </TabContext>
    </NoSsr>
  )
}
