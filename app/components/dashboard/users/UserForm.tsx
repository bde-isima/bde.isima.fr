import { Suspense } from 'react';
import { useMemo, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Tab from '@mui/material/Tab';
import { User } from 'db';
import { Switches, TextField } from 'mui-rff';

import OpenInNew from '@mui/icons-material/OpenInNewTwoTone';

import Image from 'next/image';

import PromotionsForm from 'app/components/dashboard/users/PromotionsForm';
import RolesForm from 'app/components/dashboard/users/RolesForm';
import EnhancedTextField from 'app/components/forms/EnhancedTextfield';
import { FORM_ERROR, Form } from 'app/components/forms/Form';
import SearchAddress from 'app/components/forms/SearchAddress';
import { AddressType, UserInput, UserInputType } from 'app/components/forms/validations';
import TabPanel from 'app/core/layouts/TabPanel';

type UserFormProps = {
  initialValues: User | null;
  onSuccess: (values: UserInputType) => void;
  onClose: () => void;
};

export default function UserForm(props: UserFormProps) {
  const [value, setValue] = useState('0');

  const handleChange = (_, newValue: string) => setValue(newValue);

  const onSubmit = async (values: UserInputType) => {
    try {
      await props.onSuccess(values);
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString()
      };
    }
  };

  const initialValues = useMemo(
    () => ({
      id: props.initialValues?.id,
      lastname: props.initialValues?.lastname,
      firstname: props.initialValues?.firstname,
      nickname: props.initialValues?.nickname,
      image: props.initialValues?.image,
      email: props.initialValues?.email,
      address: props.initialValues?.address as AddressType,
      card: props.initialValues?.card,
      balance: props.initialValues?.id ? props.initialValues?.balance : 0,
      roles: props.initialValues?.roles || [],
      promotionId: props.initialValues?.promotionId,
      is_member: props.initialValues?.id ? props.initialValues?.is_member : false,
      is_enabled: props.initialValues?.id ? props.initialValues?.is_enabled : true
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Form
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={UserInput}
      initialValues={initialValues}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <TabContext value={value}>
        <TabList onChange={handleChange} variant="fullWidth" aria-label="Nav">
          <Tab label="Infos" value="0" />
          <Tab label="Rôles" value="1" />
        </TabList>

        <TabPanel value="0">
          <div className="mx-auto text-center">
            {props.initialValues?.id && props.initialValues?.image && (
              <Image
                className="rounded-full"
                src={props.initialValues.image}
                width={100}
                height={100}
                alt={`Image de ${props.initialValues?.lastname} ${props.initialValues?.firstname}`}
              />
            )}
          </div>

          <TextField
            type="text"
            name="image"
            label="URL de l'image de profil"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    href="https://imgur.com/upload"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ouvrir Imgur"
                    size="large"
                  >
                    <OpenInNew />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField type="text" name="lastname" label="Nom" />
          <TextField type="text" name="firstname" label="Prénom" />
          <TextField type="text" name="nickname" label="Surnom" />

          <Divider className="m-2" />

          {props.initialValues?.id && <EnhancedTextField type="number" name="card" label="N° de carte" />}
          <TextField type="email" name="email" label="Email" />
          <SearchAddress name="address" label="Adresse postale" />
          <EnhancedTextField type="number" name="balance" label="Solde" inputProps={{ step: 0.01 }} />

          <Divider className="m-2" />

          <div>
            <Suspense fallback={<CircularProgress size={25} />}>
              <PromotionsForm />
            </Suspense>
          </div>

          <Switches name="is_member" data={{ label: 'Cotisant', value: 'is_member' }} color="primary" />

          <Switches name="is_enabled" data={{ label: 'Activé', value: 'is_enabled' }} color="primary" />
        </TabPanel>

        <TabPanel className="p-0" value="1">
          <div>
            <Suspense fallback={<CircularProgress size={25} />}>
              <RolesForm values={props.initialValues} />
            </Suspense>
          </div>
        </TabPanel>
      </TabContext>
    </Form>
  );
}
