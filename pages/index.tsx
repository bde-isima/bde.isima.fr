import { BlitzPage } from '@blitzjs/next';

import 'react-multi-carousel/lib/styles.css';
import { Suspense, lazy } from 'react';

import Landing from 'app/components/public/Landing';
import getPublicNav from 'app/components/nav/public/getPublicNav';
import { withBlitz } from 'app/blitz-client';

const Clubs = lazy(() => import('app/components/public/Clubs'));
const School = lazy(() => import('app/components/public/School'));
const Partners = lazy(() => import('app/components/public/Partners'));
const Footer = lazy(() => import('app/components/public/footer/Footer'));
const Contact = lazy(() => import('app/components/public/contact/Contact'));
const MessengerChat = lazy(() => import('app/components/public/MessengerChat'));

const Index: BlitzPage = () => {
  return (
    <>
      <Landing />
      <Suspense fallback={null}>
        <School />
      </Suspense>
      <Suspense fallback={null}>
        <Clubs />
      </Suspense>
      <Suspense fallback={null}>
        <Partners />
      </Suspense>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <MessengerChat />
      </Suspense>
    </>
  );
};

Index.suppressFirstRenderFlicker = true;
Index.getLayout = (page) => getPublicNav(page);

export default withBlitz(Index);
