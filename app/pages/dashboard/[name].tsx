import { GetStaticProps, GetStaticPaths } from 'next'
import { BlitzPage, InferGetStaticPropsType, Router } from 'blitz'

import db from 'db'
import Layout from "app/layouts/Layout"
import ClubDashboard from "app/components/dashboard/clubs/dashboard/ClubDashboard"
import { convertDatesToStrings, convertStringsToDate } from 'utils/convertDatesToStrings'

const ClubDashboardIndex: BlitzPage = ({ club }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const clb = convertStringsToDate(club) as any

  return (
    <ClubDashboard club={clb} />
  )
}

ClubDashboardIndex.getLayout = (page) => <Layout title={`Gestion de ${Router.router?.query.name}`}>{page}</Layout>

export const getStaticPaths: GetStaticPaths = async () => {
  const clubs = await db.club.findMany()

  return {
    paths: clubs.map(c => ({ params: { name: c.name } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const club = await db.club.findUnique({
    where: { name: (params?.name as string) },
  })

  return {
    props: { club: convertDatesToStrings(club) },
    revalidate: 1,
  }
}

export default ClubDashboardIndex