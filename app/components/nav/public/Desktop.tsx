import Link from 'next/link'
import Button from '@mui/material/Button'

import config from './config'
import { useCustomRouter } from 'app/entities/hooks/useCustomRouter'

export default function Desktop() {
  const { router } = useCustomRouter()

  return (
    <>
      {config.map((obj) => {
        const isActive = obj.isActive(router.asPath, window.location.hash)

        return (
          <Link key={obj.to} href={obj.to}>
            <Button
              className={`p-2 h-16 rounded-none  text-primary dark:text-secondary ${
                isActive && 'border-b border-solid border-primary dark:border-secondary'
              }`}
              aria-label={obj.text}
            >
              {obj.icon}
              <div className={`m-2 ${isActive ? 'bold' : 'normal'}`}>{obj.text}</div>
            </Button>
          </Link>
        )
      })}
    </>
  )
}
