import Link from "next/link"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { useCustomRouter } from "app/hooks/useCustomRouter"

type DesktopMenuItemProps = {
  item: any
}

export default function DesktopMenuItem({ item }: DesktopMenuItemProps) {
  const { router } = useCustomRouter()

  const isActive = item.isActive(router.asPath, window.location.hash)

  return (
    <Link href={item.to}>
      <Button
        className={`w-full p-2 h-16 rounded-none ${
          isActive && "border-b border-solid border-primary"
        }`}
        aria-label={item.text}
      >
        {item.icon}
        <Typography className={`m-2 ${isActive ? "bold" : "normal"}`} variant="subtitle2" color="textPrimary">{item.text}</Typography>
      </Button>
    </Link>
  )
}
