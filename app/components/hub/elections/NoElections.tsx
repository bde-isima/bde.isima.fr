import Image from "next/image"
import Typography from "@material-ui/core/Typography"

export default function NoElections() {
  return (
    <div className="flex flex-col place-self-center items-center">
      <Image
        src="/static/images/illustrations/WIP.svg"
        alt="Il n'y a pas d'élection BDE en cours"
        width={500}
        height={500}
        layout="intrinsic"
        objectFit="cover"
      />

      <Typography variant="h4" paragraph>
        Il n'y a pas d'élections BDE en cours
      </Typography>
    </div>
  )
}
