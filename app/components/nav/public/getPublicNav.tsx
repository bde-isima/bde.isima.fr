import Nav from 'app/components/nav/public/Nav'

export default function getPublicNav(Component) {
  return (
    <>
      <Nav />
      {Component}
    </>
  )
}
