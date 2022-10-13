import Head from 'next/head';

import SearchUserForm from 'app/components/dashboard/cashing/SearchUserForm';
import Desktop from 'app/components/nav/dashboard/Desktop';
import Nav from 'app/components/nav/hub/Nav';

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
  );
}
