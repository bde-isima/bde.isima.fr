import { useQuery } from 'blitz'
import NoSsr from '@material-ui/core/NoSsr'
import Dialog from '@material-ui/core/Dialog'
import TabContext from '@material-ui/lab/TabContext'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { useTheme, useMediaQuery } from '@material-ui/core'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useState, Suspense, unstable_SuspenseList, lazy } from 'react'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

import Close from 'mdi-material-ui/Close'
import Finance from 'mdi-material-ui/Finance'
import LayersTriple from 'mdi-material-ui/LayersTriple'
import FormatListBulletedSquare from 'mdi-material-ui/FormatListBulletedSquare'

import TabPanel from 'app/core/layouts/TabPanel'
import SlideTransition from 'app/core/layouts/SlideTransition'
import getEventSubscriptions from 'app/entities/eventSubscriptions/queries/getEventSubscriptions'

const SuspenseList = unstable_SuspenseList
const SubscriptionRecap = lazy(() => import('./recap/SubscriptionRecap'))
const SubscriptionsList = lazy(() => import('./list/SubscriptionsList'))
const SubscriptionsAnalytics = lazy(() => import('./analytics/SubscriptionsAnalytics'))

export default function Manager({ open, event, onClose }) {
  const [value, setValue] = useState(0)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

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
          <DialogTitle className="flex items-center" id="manager-dialog-title" disableTypography>
            <Typography variant="h6" color="inherit">
              Manager d'évènements
            </Typography>

            <IconButton className="ml-auto" onClick={onClose} aria-label="Fermer le manager">
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <SuspenseList revealOrder="forwards">
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
            </SuspenseList>
          </DialogContent>

          <DialogActions className="p-0">
            <BottomNavigation
              className="w-full"
              showLabels={!fullScreen}
              value={value}
              onChange={onChange}
            >
              <BottomNavigationAction label="Statistiques" icon={<Finance />} />
              <BottomNavigationAction label="Liste inscrits" icon={<FormatListBulletedSquare />} />
              <BottomNavigationAction label="Récapitulatif" icon={<LayersTriple />} />
            </BottomNavigation>
          </DialogActions>
        </Dialog>
      </TabContext>
    </NoSsr>
  )
}
