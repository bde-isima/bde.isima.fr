import "react-multi-carousel/lib/styles.css"
import { lazy, unstable_SuspenseList } from "react"

const SuspenseList = unstable_SuspenseList
const Clubs = lazy(() => import("app/components/public/Clubs"))
const School = lazy(() => import("app/components/public/School"))
const Landing = lazy(() => import("app/components/public/Landing"))
const Partners = lazy(() => import("app/components/public/Partners"))
const Footer = lazy(() => import("app/components/public/footer/Footer"))
const MessengerChat = lazy(() => import("app/integrations/MessengerChat"))
const Contact = lazy(() => import("app/components/public/contact/Contact"))

export default function Index() {
  return (
    <SuspenseList revealOrder="forwards">
      <Landing />
      <School />
      <Clubs />
      <Partners />
      <Contact />
      <Footer />
      <MessengerChat />
    </SuspenseList>
  )
}
