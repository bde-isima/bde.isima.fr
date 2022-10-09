import { Suspense } from 'react';

import Divider from '@mui/material/Divider';

import { BlitzPage, Routes } from '@blitzjs/next';

import Header from 'app/components/hub/events/Header';
import Cart from 'app/components/hub/events/cart/Cart';
import ProductsList from 'app/components/hub/events/product/ProductsList';
import { EventSubscriptionProvider } from 'app/components/hub/events/subscription/EventSubscription';
import getHubNav from 'app/components/nav/hub/getHubNav';

const EventIndex: BlitzPage = () => {
  return (
    <div className="flex flex-col-reverse md:grid mb-20" style={{ gridTemplateColumns: '1fr auto 310px' }}>
      <Suspense fallback={null}>
        <EventSubscriptionProvider>
          <main className="flex flex-col space-y-4">
            <Header />
            <ProductsList />
          </main>

          <Divider className="mx-8" orientation="vertical" variant="middle" flexItem />

          <aside>
            <Cart />
          </aside>
        </EventSubscriptionProvider>
      </Suspense>
    </div>
  );
};

EventIndex.suppressFirstRenderFlicker = true;
EventIndex.authenticate = { redirectTo: Routes.Login() };
EventIndex.getLayout = (page) => getHubNav(page, 'Événement ZZ');

export default EventIndex;
