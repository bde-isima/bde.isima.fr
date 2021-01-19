import { Suspense } from "react"
import Divider from "@material-ui/core/Divider"

import Header from "app/components/hub/events/Header"
import Cart from "app/components/hub/events/cart/Cart"
import ProductsList from "app/components/hub/events/product/ProductsList"
import { EventSubscriptionProvider } from "app/components/hub/events/subscription/EventSubscription"

export default function EventIndex() {
  return (
    <div
      className="flex flex-col-reverse md:grid md:gap-16 mb-20"
      style={{ gridTemplateColumns: "1fr 310px" }}
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
