import { useState } from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import MoneyOff from '@mui/icons-material/MoneyOffTwoTone';

import Image from 'next/image';

import { BlitzPage, Routes } from '@blitzjs/next';
import { invalidateQuery, useMutation } from '@blitzjs/rpc';

import Table from 'app/components/dashboard/data/Table';
import UserForm from 'app/components/dashboard/users/UserForm';
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';
import deleteManyUsers from 'app/entities/users/mutations/deleteManyUsers';
import resetMembershipState from 'app/entities/users/mutations/resetMembershipState';
import upsertUser from 'app/entities/users/mutations/upsertUser';
import getUsers from 'app/entities/users/queries/getUsers';

const Users: BlitzPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [resetMutation] = useMutation(resetMembershipState);

  const handleReset = async () => {
    await resetMutation();
    await invalidateQuery(getUsers);
    handleClose();
  };

  const globalActions = [
    {
      title: 'Réinitialiser les cotisations',
      icon: <MoneyOff />,
      action: async () => {
        handleOpen();
      }
    }
  ];

  return (
    <>
      <Table
        title="Membres"
        columns={columns}
        queryKey="users"
        getQuery={getUsers}
        queryArgs={{ include: { promotion: true } }}
        upsertQuery={upsertUser}
        deleteQuery={deleteManyUsers}
        FormComponent={UserForm}
        globalActions={globalActions}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="Confirmer la réinitialisation des cotisations">
        <DialogTitle id="alert-dialog-title">
          {"Confirmer la réinitialisation de l'ensemble des cotisations ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cette opération est irréversible, l&apos;ensemble des membres cotisants sur la plateforme ne bénéficienront
            plus de leur état de cotisation.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Annuler
          </Button>
          <Button onClick={handleReset}>Réinitialiser</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Users.suppressFirstRenderFlicker = true;
Users.authenticate = { redirectTo: Routes.Login() };
Users.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Users());
Users.getLayout = (page) => getDashboardNav(page, 'Gestion des membres');

const columns = [
  {
    id: 'image',
    headerName: 'Photo',
    render: (row) =>
      row.image && (
        <Image
          className="ml-auto"
          src={row.image}
          width={40}
          height={40}
          alt={`Photo de ${row.lastname} ${row.firstname}`}
        />
      )
  },
  {
    id: 'lastname',
    headerName: 'Nom',
    searchCriteria: 'contains'
  },
  {
    id: 'firstname',
    headerName: 'Prénom',
    searchCriteria: 'contains'
  },
  {
    id: 'nickname',
    headerName: 'Surnom',
    searchCriteria: 'contains'
  },
  {
    id: 'email',
    headerName: 'Email',
    searchCriteria: 'contains'
  },
  {
    id: 'card',
    headerName: 'N° Carte'
  },
  {
    id: 'balance',
    headerName: 'Solde',
    render: (row) => row.balance.toFixed(2)
  },
  {
    id: 'promotion',
    exclude: true,
    headerName: 'Promotion',
    render: (row) => row.promotion?.year
  },
  {
    id: 'roles',
    headerName: 'Roles',
    render: (row) => row.roles.join(', ')
  },
  {
    id: 'is_member',
    headerName: 'Cotisant',
    render: (row) => <Checkbox checked={row.is_member} color="default" disabled />
  },
  {
    id: 'is_enabled',
    headerName: 'Activé',
    render: (row) => <Checkbox checked={row.is_enabled} color="default" disabled />
  }
];

export default Users;
