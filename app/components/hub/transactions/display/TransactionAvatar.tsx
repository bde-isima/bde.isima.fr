import Image from "next/image"
import { useQuery } from "blitz"

import getUserPublicData from "app/entities/users/queries/getUserPublicData"

export default function TransactionAvatar({ id }) {
  const [{ image }] = useQuery(getUserPublicData, { where: { id } })

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
