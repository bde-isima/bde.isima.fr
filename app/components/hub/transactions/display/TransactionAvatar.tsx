import { Image, useQuery } from 'blitz'

import getUserPublicData from 'app/entities/users/queries/getUserPublicData'

export default function TransactionAvatar({ id }) {
  const [{ image }] = useQuery(getUserPublicData, { where: { id } })

  return (
    <div className="m-2">
      {image && (
        <Image
          className="rounded-full"
          src={image}
          width={40}
          height={40}
          alt="Photo de profil de l'émetteur"
        />
      )}
    </div>
  )
}
