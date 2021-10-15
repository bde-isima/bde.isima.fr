import { Head } from 'blitz'
import Container from '@mui/material/Container'

import Nav from 'app/components/nav/hub/Nav'

export default function getHubNav(Component, title = 'Hub ZZ') {
  return (
    <Container className="pt-24">
      <Head>
        <title>{title}</title>
      </Head>

      <Nav />
      {Component}
    </Container>
  )
}
