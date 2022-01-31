import { TextField } from 'mui-rff'
import { useForm } from 'react-final-form'
import Divider from '@mui/material/Divider'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import { FieldArray } from 'react-final-form-arrays'
import InputAdornment from '@mui/material/InputAdornment'

import Add from '@mui/icons-material/AddTwoTone'
import Close from '@mui/icons-material/CloseTwoTone'
import OpenInNew from '@mui/icons-material/OpenInNewTwoTone'

export default function CandidatesForm() {
  const form = useForm()

  const onAddItem = (name) => () => form.mutators.push(name, undefined)

  const onDeleteItem = (name, idx) => () => form.mutators.remove(name, idx)

  return (
    <FormControl className="flex flex-col" component="fieldset">
      <FormLabel className="flex items-center justify-evenly" component="legend">
        <Typography>Candidats</Typography>
        <IconButton
          className="m-2"
          onClick={onAddItem('candidates')}
          aria-label="Ajouter un candidat"
          size="small"
        >
          <Add />
        </IconButton>
      </FormLabel>

      <FieldArray name="candidates">
        {({ fields }) =>
          fields.map((candidateName, candidateIdx) => (
            <div
              key={candidateIdx}
              className="relative flex flex-col p-4 m-4 border border-gray-200"
            >
              <IconButton
                className="absolute top-0 right-0 transform-gpu translate-x-1/2 -translate-y-1/2 bg-white border border-solid border-gray-200"
                onClick={onDeleteItem('candidates', candidateIdx)}
                aria-label="Supprimer un candidat"
                size="small"
              >
                <Close />
              </IconButton>

              <FormControl className="relative my-3 flex flex-col" component="fieldset">
                <FormLabel component="legend">Candidat n°{candidateIdx + 1}</FormLabel>
                <Divider className="m-2" />

                <FormGroup aria-label={`Candidat n°${candidateIdx + 1}`}>
                  <TextField
                    className="my-1"
                    type="text"
                    name={`${candidateName}.image`}
                    label="URL de l'image du candidat"
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
                      ),
                    }}
                    helperText="Format PNG obligatoire"
                  />

                  <TextField
                    className="my-1"
                    type="text"
                    name={`${candidateName}.name`}
                    label="Nom"
                  />
                </FormGroup>
              </FormControl>

              {(!fields.length || candidateIdx === fields.length - 1) && (
                <IconButton
                  className="absolute bottom-0 right-0 transform-gpu translate-x-1/2 translate-y-1/2 bg-white border border-solid border-gray-200"
                  onClick={onAddItem('candidates')}
                  aria-label="Ajouter un candidat"
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
  )
}
