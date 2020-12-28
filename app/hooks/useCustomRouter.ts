import { useRouter } from "blitz"

export const useCustomRouter = () => {
  const router = useRouter()

  const pushRoute = (path) => () => router.push(path)

  return { router, pushRoute }
}
