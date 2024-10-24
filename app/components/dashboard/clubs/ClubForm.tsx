import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Club } from 'db';
import { Switches, TextField } from 'mui-rff';

import OpenInNew from '@mui/icons-material/OpenInNewTwoTone';

import Image from 'next/image';

import { FORM_ERROR, Form } from 'app/components/forms/Form';
import { ClubInput, ClubInputType } from 'app/components/forms/validations';

type ClubFormProps = {
  initialValues: Club | null;
  onSuccess: (values: ClubInputType) => void;
  onClose: () => void;
};

export default function ClubForm(props: ClubFormProps) {
  const onSubmit = async (values) => {
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
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={ClubInput}
      initialValues={{
        id: props.initialValues?.id,
        image: props.initialValues?.image,
        name: props.initialValues?.name,
        email: props.initialValues?.email,
        description: props.initialValues?.description,
        facebookURL: props.initialValues?.facebookURL,
        twitterURL: props.initialValues?.twitterURL,
        instagramURL: props.initialValues?.instagramURL,
        customURL: props.initialValues?.customURL,
        isPublic: props.initialValues?.isPublic
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <div className="mx-auto">
        {props.initialValues?.id && props.initialValues?.image && (
          <Image
            src={props.initialValues.image}
            width={100}
            height={100}
            alt={`Image de ${props.initialValues?.name}`}
          />
        )}
      </div>

      <TextField
        type="text"
        name="image"
        label="URL de l'image du club"
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

      <TextField type="text" name="name" label="Nom" />
      <TextField type="email" name="email" label="Adresse email" />
      <TextField type="text" name="description" label="Description" multiline rows={15} />

      <Switches name="isPublic" data={{ label: 'Public', value: 'isPublic' }} color="primary" />

      <Divider className="m-2" />

      <TextField type="text" name="facebookURL" label="Facebook" />
      <TextField type="text" name="twitterURL" label="Twitter" />
      <TextField type="text" name="instagramURL" label="Instagram" />
      <TextField type="text" name="customURL" label="Site web" />
    </Form>
  );
}
