import { Head } from 'blitz'
import Nav from 'app/components/nav/public/Nav'

export default function getPublicNav(Component, title = 'BDE ISIMA') {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />
      {Component}
    </>
  )
}
