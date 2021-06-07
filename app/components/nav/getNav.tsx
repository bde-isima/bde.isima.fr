import getHubNav from './hub/getHubNav'
import getPublicNav from './public/getPublicNav'
import getDashboardNav from './dashboard/getDashboardNav'

export default function getNav(router, Component) {
  if (router.pathname.startsWith('/dashboard')) {
    return getDashboardNav(Component)
  } else if (router.pathname.startsWith('/hub')) {
    return getHubNav(Component)
  } else {
    return getPublicNav(Component)
  }
}
