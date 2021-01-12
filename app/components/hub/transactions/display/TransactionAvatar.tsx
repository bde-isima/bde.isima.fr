import Image from "next/image"
import { useQuery } from "blitz"

import getUser from "app/entities/users/queries/getUser"

export default function TransactionAvatar({ id }) {
  const [{ image }] = useQuery(getUser, { where: { id } })

  return (
    <Image
      className="mx-2 bg-primary"
      src={image ?? "//:0"}
      width={40}
      height={40}
      alt="Photo de profil de l'émetteur"
    />
  )
}
