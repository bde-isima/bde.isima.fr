import { Suspense, lazy } from 'react';

import 'react-multi-carousel/lib/styles.css';

import { BlitzPage } from '@blitzjs/next';

import getPublicNav from 'app/components/nav/public/getPublicNav';
import Landing from 'app/components/public/Landing';

const Clubs = lazy(() => import('app/components/public/Clubs'));
const School = lazy(() => import('app/components/public/School'));
const Partners = lazy(() => import('app/components/public/Partners'));
const Footer = lazy(() => import('app/components/public/footer/Footer'));
const Contact = lazy(() => import('app/components/public/contact/Contact'));

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
    </>
  );
};

Index.suppressFirstRenderFlicker = true;
Index.getLayout = (page) => getPublicNav(page);

export default Index;
