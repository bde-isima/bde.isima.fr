import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TextField } from 'mui-rff';
import { useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import Add from '@mui/icons-material/AddTwoTone';
import Close from '@mui/icons-material/CloseTwoTone';
import ContentCopy from '@mui/icons-material/ContentCopyTwoTone';

const itemName = 'participants';
export default function ParticipantForm() {
  const form = useForm();

  const onAddItem = (name) => () => form.mutators.push(name, undefined);

  const onDuplicateItem = (name, idxToCopy) => () => {
    const participants = form.getFieldState(name);
    form.mutators.push(name, { ...participants?.value[idxToCopy] });
  };

  const onDeleteItem = (name, idx) => () => form.mutators.remove(name, idx);
  const iconClassBase = 'absolute transform-gpu translate-x-1/2 bg-white border border-solid border-gray-200';

  return (
    <FormControl className="flex flex-col" component="fieldset">
      <FormLabel className="flex items-center justify-evenly" component="legend">
        <Typography>Participants</Typography>
        <IconButton className="m-2" onClick={onAddItem(itemName)} aria-label="Ajouter un participant" size="small">
          <Add />
        </IconButton>
      </FormLabel>

      <FieldArray name="participants">
        {({ fields }) =>
          fields.map((participantName, participantIdx) => (
            <div key={participantIdx} className="relative flex flex-col p-4 m-4 border border-gray-200">
              <IconButton
                className={`right-0 top-0 -translate-y-1/2 ${iconClassBase}`}
                onClick={onDeleteItem(itemName, participantIdx)}
                aria-label="Supprimer"
                size="small"
              >
                <Close />
              </IconButton>

              <IconButton
                className={`right-9 top-0 -translate-y-1/2 ${iconClassBase}`}
                onClick={onDuplicateItem(itemName, participantIdx)}
                aria-label="Dupliquer"
                size="small"
              >
                <ContentCopy />
              </IconButton>

              <FormControl className="relative my-3 flex flex-col" component="fieldset">
                <FormLabel component="legend">Participant n°{participantIdx + 1}</FormLabel>
                <Divider className="m-2" />

                <FormGroup aria-label={`Participant n°${participantIdx + 1}`}>
                  <div className="flex flex-col md:flex-row">
                    <TextField className="my-1 md:mr-1" type="text" name={`${participantName}`} label="Nom" />
                  </div>
                </FormGroup>
              </FormControl>

              {(!fields.length || participantIdx === fields.length - 1) && (
                <IconButton
                  className={`bottom-0 right-0 translate-y-1/2 ${iconClassBase}`}
                  onClick={onAddItem(itemName)}
                  aria-label="Ajouter un participant"
                  size="small"
                >
                  <Add />
                </IconButton>
              )}
            </div>
          ))
        }
      </FieldArray>
    </FormControl>
  );
}
