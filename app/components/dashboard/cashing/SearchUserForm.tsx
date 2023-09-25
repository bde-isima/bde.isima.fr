import { Suspense, lazy, useState } from 'react';

import { User } from 'db';

import { useAuthenticatedSession } from '@blitzjs/auth';

import SearchUser from 'app/components/dashboard/cashing/SearchUser';
import { Form } from 'app/components/forms/Form';
import getUsers from 'app/entities/users/queries/getUsers';

const CashingDialog = lazy(() => import('./CashingDialog'));

export default function SearchUserForm() {
  const session = useAuthenticatedSession();
  const [selected, setSelected] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const onSelection = (_, newValue: User | null) => {
    setSelected(newValue);
    setOpen(true);
  };

  const onDialogSelection = (_, newValue: User | null) => setSelected(newValue);

  const onClear = () => setSelected(null);

  return (
    <>
      {session?.roles.some((x) => x.toLowerCase() === 'bde' || x === '*' || x.toLowerCase() === 'listeux') && (
        <div className="w-full md:w-80 p-4 mb-4">
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
        </div>
      )}
    </>
  );
}
