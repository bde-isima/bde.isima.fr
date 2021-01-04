import { useQuery } from "react-query"
import Avatar from "@material-ui/core/Avatar"
import Skeleton from "@material-ui/core/Skeleton"

import getUser from "app/entities/users/queries/getUser"

export default function TransactionAvatar({ id }) {
  const { data, isFetching } = useQuery(getUser, { where: { id } })

  return (
    <>
      {isFetching && <Skeleton variant="circular" width={40} height={40} />}

      {!isFetching && (
        <Avatar
          className="mx-2 bg-primary"
          src={data?.image ?? undefined}
          alt="Photo de profil de l'émetteur"
        />
      )}
    </>
  )
}
