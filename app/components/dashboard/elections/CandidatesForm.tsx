import Image from "next/image"
import { TextField } from "mui-rff"
import Divider from "@material-ui/core/Divider"
import { useForm, Field } from "react-final-form"
import FormGroup from "@material-ui/core/FormGroup"
import FormLabel from "@material-ui/core/FormLabel"
import { FieldArray } from "react-final-form-arrays"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import FormControl from "@material-ui/core/FormControl"
import InputAdornment from "@material-ui/core/InputAdornment"

import Plus from "mdi-material-ui/Plus"
import Close from "mdi-material-ui/Close"
import OpenInNew from "mdi-material-ui/OpenInNew"

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
          onClick={onAddItem("candidates")}
          aria-label="Ajouter un candidat"
          size="small"
        >
          <Plus />
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
                onClick={onDeleteItem("candidates", candidateIdx)}
                aria-label="Supprimer un candidat"
                size="small"
              >
                <Close />
              </IconButton>

              <FormControl className="relative my-3 flex flex-col" component="fieldset">
                <FormLabel component="legend">Candidat n°{candidateIdx + 1}</FormLabel>
                <Divider className="m-2" />

                <div className="mx-auto">
                  <Field name={`${candidateName}.image`}>
                    {(props) =>
                      props.input.value && (
                        <Image
                          className="rounded-full"
                          src={props.input.value}
                          width={100}
                          height={100}
                          alt="Image du candidat"
                        />
                      )
                    }
                  </Field>
                </div>

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
                          >
                            <OpenInNew />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
                  onClick={onAddItem("candidates")}
                  aria-label="Ajouter un candidat"
                  size="small"
                >
                  <Plus />
                </IconButton>
              )}
            </div>
          ))
        }
      </FieldArray>
    </FormControl>
  )
}
