import { useState } from "react"

import PageTitle from "app/layouts/PageTitle"
import Upcoming from "app/components/hub/events/Upcoming"
import TopUpDialog from "app/components/hub/transactions/operations/topUp/TopUpDialog"
import TransactionsCard from "app/components/hub/transactions/display/TransactionsCard"
import HistoryDialog from "app/components/hub/transactions/operations/history/HistoryDialog"
import TransferDialog from "app/components/hub/transactions/operations/transfer/TransferDialog"

export default function Hub() {
  const [isTransferOpen, setIsTransferOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)

  const toggleDialog = (fn, open) => () => fn(open)

  return (
    <>
      <PageTitle title="Hub ZZ" />

      <div
        className="flex flex-col-reverse md:grid md:gap-16"
        style={{ gridTemplateColumns: "1fr 310px" }}
      >
        <main className="flex flex-col">
          <Upcoming />
        </main>

        <aside>
          <TransactionsCard
            openTransfer={toggleDialog(setIsTransferOpen, true)}
            openHistory={toggleDialog(setIsHistoryOpen, true)}
            openTopUp={toggleDialog(setIsTopUpOpen, true)}
          />
          <TransferDialog
            isOpen={isTransferOpen}
            onClose={toggleDialog(setIsTransferOpen, false)}
          />
          <HistoryDialog isOpen={isHistoryOpen} onClose={toggleDialog(setIsHistoryOpen, false)} />
          <TopUpDialog isOpen={isTopUpOpen} onClose={toggleDialog(setIsTopUpOpen, false)} />
        </aside>
      </div>
    </>
  )
}
