import { Head } from 'blitz'

import Nav from 'app/components/nav/hub/Nav'
import Desktop from 'app/components/nav/dashboard/Desktop'
import SearchUserForm from 'app/components/dashboard/cashing/SearchUserForm'

export default function getDashboardNav(Component, title = 'Dashboard ZZ') {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Nav />
      <Desktop />

      <div className="flex flex-col items-end pt-20 pb-4 pl-4 md:pl-64 pr-4">
        <SearchUserForm />
        {Component}
      </div>
    </>
  )
}
