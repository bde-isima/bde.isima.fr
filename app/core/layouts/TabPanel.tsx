import clsx from 'clsx'
import { ReactNode } from 'react'
import { getPanelId, getTabId, useTabContext } from '@material-ui/lab/TabContext'

interface TabPanelProps {
  children?: ReactNode
  className?: string
  value: string
}

export default function TabPanel(props: TabPanelProps) {
  const { children, className, value, ...other } = props
  const context = useTabContext()

  if (context === null) {
    throw new TypeError('No TabContext provided')
  }
  const id = getPanelId(context, value)
  const tabId = getTabId(context, value)

  return (
    <div
      aria-labelledby={tabId}
      className={clsx('MuiTabPanel-root', className)}
      hidden={value !== context.value}
      id={id}
      role="tabpanel"
      {...other}
    >
      {children}
    </div>
  )
}
