import { BlitzPage, Routes } from '@blitzjs/next'
import { useState } from 'react'

import News from 'app/components/hub/home/News'
import getHubNav from 'app/components/nav/hub/getHubNav'
import Upcoming from 'app/components/hub/events/Upcoming'
import DiscordButton from 'app/components/hub/home/DiscordButton'
import TopUpDialog from 'app/components/hub/transactions/operations/topUp/TopUpDialog'
import TransactionsCard from 'app/components/hub/transactions/display/TransactionsCard'
import HistoryDialog from 'app/components/hub/transactions/operations/history/HistoryDialog'
import TransferDialog from 'app/components/hub/transactions/operations/transfer/TransferDialog'

const Hub: BlitzPage = () => {
  const [isTransferOpen, setIsTransferOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)

  const toggleDialog = (fn, open) => () => fn(open)

  return (
    <div
      className="flex flex-col-reverse md:grid md:gap-16 space-y-6 space-y-reverse"
      style={{ gridTemplateColumns: '1fr 310px' }}
    >
      <main className="flex flex-col space-y-6">
        <News />
        <Upcoming />
      </main>

      <aside>
        <TransactionsCard
          openTransfer={toggleDialog(setIsTransferOpen, true)}
          openHistory={toggleDialog(setIsHistoryOpen, true)}
          openTopUp={toggleDialog(setIsTopUpOpen, true)}
        />
        <DiscordButton />
        <TransferDialog isOpen={isTransferOpen} onClose={toggleDialog(setIsTransferOpen, false)} />
        <HistoryDialog isOpen={isHistoryOpen} onClose={toggleDialog(setIsHistoryOpen, false)} />
        <TopUpDialog isOpen={isTopUpOpen} onClose={toggleDialog(setIsTopUpOpen, false)} />
      </aside>
    </div>
  )
}

Hub.suppressFirstRenderFlicker = true
Hub.authenticate = { redirectTo: Routes.Login() }
Hub.getLayout = (page) => getHubNav(page)

export default Hub
