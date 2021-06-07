import { useRouter } from 'next/router'

export const useCustomRouter = () => {
  const router = useRouter()

  const pushRoute = (path) => () => router.push(path)

  return { router, pushRoute }
}
