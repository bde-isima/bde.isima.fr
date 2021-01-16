import { lazy, unstable_SuspenseList, useState } from "react"

import PageTitle from "app/layouts/PageTitle"

const SuspenseList = unstable_SuspenseList
const Upcoming = lazy(() => import("app/components/hub/events/Upcoming"))
const TopUpDialog = lazy(
  () => import("app/components/hub/transactions/operations/topUp/TopUpDialog")
)
const TransactionsCard = lazy(
  () => import("app/components/hub/transactions/display/TransactionsCard")
)
const HistoryDialog = lazy(
  () => import("app/components/hub/transactions/operations/history/HistoryDialog")
)
const TransferDialog = lazy(
  () => import("app/components/hub/transactions/operations/transfer/TransferDialog")
)

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
        <SuspenseList revealOrder="forwards">
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
        </SuspenseList>
      </div>
    </>
  )
}
