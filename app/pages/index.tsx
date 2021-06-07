import 'react-multi-carousel/lib/styles.css'
import { lazy, Suspense, SuspenseList } from 'react'

import Landing from 'app/components/public/Landing'

const Clubs = lazy(() => import('app/components/public/Clubs'))
const School = lazy(() => import('app/components/public/School'))
const Partners = lazy(() => import('app/components/public/Partners'))
const Footer = lazy(() => import('app/components/public/footer/Footer'))
const Contact = lazy(() => import('app/components/public/contact/Contact'))
const MessengerChat = lazy(() => import('app/components/public/MessengerChat'))

export default function Index() {
  return (
    <SuspenseList revealOrder="forwards">
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
    </SuspenseList>
  )
}
