import { BlitzPage } from "blitz"
import { lazy, unstable_SuspenseList } from "react"

import Layout from "app/layouts/Layout"

const SuspenseList = unstable_SuspenseList
const Clubs = lazy(() => import("app/components/public/Clubs"))
const School = lazy(() => import("app/components/public/School"))
const Landing = lazy(() => import("app/components/public/Landing"))
const Partners = lazy(() => import("app/components/public/Partners"))
const MessengerChat = lazy(() => import("integrations/MessengerChat"))
const Footer = lazy(() => import("app/components/public/footer/Footer"))
const Contact = lazy(() => import("app/components/public/contact/Contact"))

const Index: BlitzPage = () => {
  return (
    <SuspenseList revealOrder="forwards">
      {/** The anchor link is put here so it scrolls all way to the very top */}
      <a id="landing" href="#landing" />
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

Index.getLayout = (page) => <Layout title="BDE ISIMA">{page}</Layout>

export default Index
