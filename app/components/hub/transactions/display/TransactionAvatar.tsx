import { useQuery } from "blitz"
import Avatar from "@material-ui/core/Avatar"
import Skeleton from "@material-ui/core/Skeleton"

import getUser from "app/entities/users/queries/getUser"

export default function TransactionAvatar({ id }) {
  const [user, { isFetching, failureCount }] = useQuery(getUser, {
    where: { id },
  })

  return (
    <>
      {(isFetching || failureCount > 3) && <Skeleton variant="circular" width={40} height={40} />}

      {!isFetching && (
        <Avatar
          className="mx-2 bg-primary"
          src={user?.image ?? undefined}
          alt="Photo de profil de l'émetteur"
        />
      )}
    </>
  )
}
