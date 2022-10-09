import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

type ProductCommentProps = {
  onChange: (event) => void;
};

export default function ProductComment({ onChange }: ProductCommentProps) {
  return (
    <FormControl className="m-3 flex" component="fieldset">
      <TextField
        label="Commentaires"
        placeholder="(Allergies, demandes particulières)"
        onChange={onChange}
        multiline
        rows={2}
      />
    </FormControl>
  );
}
