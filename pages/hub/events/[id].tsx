import { Routes } from "@blitzjs/next";
import { BlitzPage } from "@blitzjs/next";
import { Suspense } from 'react'
import Divider from '@mui/material/Divider'

import Header from 'app/components/hub/events/Header'
import Cart from 'app/components/hub/events/cart/Cart'
import getHubNav from 'app/components/nav/hub/getHubNav'
import ProductsList from 'app/components/hub/events/product/ProductsList'
import { EventSubscriptionProvider } from 'app/components/hub/events/subscription/EventSubscription'

const EventIndex: BlitzPage = () => {
  return (
    <div
      className="flex flex-col-reverse md:grid md:gap-16 mb-20"
      style={{ gridTemplateColumns: '1fr 310px' }}
    >
      <Suspense fallback={null}>
        <EventSubscriptionProvider>
          <main className="flex flex-col">
            <Header />
            <Divider className="m-4" />
            <ProductsList />
          </main>

          <aside>
            <Cart />
          </aside>
        </EventSubscriptionProvider>
      </Suspense>
    </div>
  )
}

EventIndex.suppressFirstRenderFlicker = true
EventIndex.authenticate = { redirectTo: Routes.Login() }
EventIndex.getLayout = (page) => getHubNav(page, 'Événement ZZ')

export default EventIndex
