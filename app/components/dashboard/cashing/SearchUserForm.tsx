import { useSession } from "blitz"
import Paper from "@material-ui/core/Paper"
import { useState, lazy, Suspense } from "react"

import { User } from "db"
import { Form } from "app/components/forms/Form"
import getUsers from "app/entities/users/queries/getUsers"
import SearchUser from "app/components/dashboard/cashing/SearchUser"

const CashingDialog = lazy(() => import("./CashingDialog"))

export default function SearchUserForm() {
  const session = useSession()
  const [selected, setSelected] = useState<User | null>(null)
  const [open, setOpen] = useState(false)

  const onSelection = (event: any, newValue: User | null) => {
    setSelected(newValue)
    setOpen(true)
  }

  const onDialogSelection = (event: any, newValue: User | null) => setSelected(newValue)

  const onClear = () => setSelected(null)

  return (
    <>
      {session?.roles.some((x) => x.toLowerCase() === "bde" || x === "*") && (
        <Paper className="w-full md:w-80 p-4 mb-4">
          <Form onSubmit={() => {}} autoComplete="off">
            <SearchUser
              name="user"
              label="Encaisser un membre ..."
              onSelection={onSelection}
              getQuery={getUsers}
              value={selected}
              open={open}
              setOpen={setOpen}
            />
          </Form>

          <Suspense fallback={null}>
            <CashingDialog user={selected} onSelection={onDialogSelection} onClear={onClear} />
          </Suspense>
        </Paper>
      )}
    </>
  )
}
