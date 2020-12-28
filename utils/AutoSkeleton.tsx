import { ReactNode } from "react"
import Skeleton from "@material-ui/core/Skeleton"

type AutoSkeletonProps = {
  variant?: "circular" | "text" | "rectangular" | undefined
  loading: boolean
  children: ReactNode
}

export default function AutoSkeleton({
  variant = "circular",
  loading,
  children,
}: AutoSkeletonProps) {
  return (
    <>
      {loading ? (
        <Skeleton animation="wave" variant={variant}>
          {children}
        </Skeleton>
      ) : (
        children
      )}
    </>
  )
}
