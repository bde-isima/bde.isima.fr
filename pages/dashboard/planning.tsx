import Image from "next/image"
import Typography from "@material-ui/core/Typography"

export default function Planning() {
  return (
    <div className="flex flex-col place-self-center items-center">
      <Image
        src="/static/images/illustrations/WIP.svg"
        alt="Work In Progress"
        width={500}
        height={500}
        layout="intrinsic"
        objectFit="cover"
      />

      <Typography variant="h4" paragraph>
        En construction
      </Typography>
    </div>
  )
}
