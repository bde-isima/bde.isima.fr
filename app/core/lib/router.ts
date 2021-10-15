import { useRouter as useNextRouter } from 'next/router'

export const useRouter = () => {
  const router = useNextRouter()

  const pushRoute = (path) => () => router.push(path)

  return { router, pushRoute }
}
