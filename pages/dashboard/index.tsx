import { GetServerSideProps } from "next"

export default function DashboardIndex() {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/dashboard-redirect`,
    },
  }
}
