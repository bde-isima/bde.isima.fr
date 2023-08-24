import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { TextField } from 'mui-rff';

import OpenInNew from '@mui/icons-material/OpenInNewTwoTone';

import Image from 'next/image';

import { FORM_ERROR, Form } from 'app/components/forms/Form';
import SearchAddress from 'app/components/forms/SearchAddress';
import { AddressType, SettingsInput, SettingsInputType } from 'app/components/forms/validations';
import { useCurrentUser } from 'app/entities/hooks/useCurrentUser';

type SettingsFormProps = {
  onSuccess: (values: SettingsInputType) => void;
};

export default function SettingsForm(props: SettingsFormProps) {
  const [user] = useCurrentUser();

  const onSubmit = async (values: SettingsInputType) => {
    try {
      await props.onSuccess(values);
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString()
      };
    }
  };

  return (
    <Form
      submitText="Sauvegarder"
      schema={SettingsInput}
      initialValues={{
        nickname: user?.nickname,
        email: user?.email,
        image: user?.image,
        address: user?.address as AddressType
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <Typography variant="h6">
        {user?.lastname} {user?.firstname} (n° {user?.card}) - {user?.is_member ? 'Cotisant' : 'Non-cotisant'}
      </Typography>

      <Divider className="m-2" />

      <TextField
        type="text"
        name="nickname"
        label="Surnom"
        fieldProps={{ allowNull: true, parse: (value) => (value === '' ? null : value) }}
      />
      <TextField type="email" name="email" label="Adresse email" />

      <SearchAddress name="address" label="Adresse postale" />

      <div className="mx-auto">
        {user?.image && (
          <Image className="rounded-full" src={user.image} width={100} height={100} alt="Image de profil" />
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
        fieldProps={{ allowNull: true, parse: (value) => (value === '' ? null : value) }}
      />

      <SearchAddress name="address" label="Adresse postale" />
    </Form>
  );
}
