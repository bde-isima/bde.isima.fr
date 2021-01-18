import { Autocomplete } from "mui-rff"
import { useQuery } from "blitz"
import TextField from "@material-ui/core/TextField"
import { useState, Dispatch, SetStateAction } from "react"
import MuiAutocomplete from "@material-ui/core/Autocomplete"
import CircularProgress from "@material-ui/core/CircularProgress"

import { User } from "db"
import { useBDESession } from "app/components/auth/SessionProvider"

type SearchUserProps = {
  className?: string
  name: string
  label: string
  value?: User | null
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onSelection?: (event: any, newValue: User | null) => void
  getQuery: any
  disableSelf?: boolean
  withForm?: boolean
}

export default function SearchUser({
  className = "",
  name,
  label,
  value,
  open,
  setOpen,
  onSelection,
  getQuery,
  disableSelf = false,
  withForm = false,
}: SearchUserProps) {
  const session = useBDESession()
  const [options, setOptions] = useState<User[]>([])
  const loading = open && options.length === 0

  const toggleOpen = (value) => () => setOpen(value)

  const onSuccess = ({ users }) => setOptions(users)

  useQuery(
    getQuery,
    { where: { is_enabled: true } },
    { suspense: false, onSuccess, enabled: loading }
  )

  const props = {
    className,
    open,
    options,
    loading,
    loadingText: "Chargement des membres ...",
    onChange: onSelection,
    onOpen: toggleOpen(true),
    onClose: toggleOpen(false),
    getOptionDisabled: (option: User) => disableSelf && option.id === session?.userId,
    getOptionSelected: (option: User, value: User) => option.id === value.id,
    getOptionLabel: (option: User) =>
      option
        ? `${option.card} - ${option.lastname} ${option.firstname} ${
            option.nickname ? `(${option.nickname})` : ""
          }`
        : "",
    renderInput: (params) => (
      <TextField
        {...params}
        label={label}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    ),
  }

  if (withForm) {
    return <Autocomplete name={name} label={label} {...props} />
  }

  return <MuiAutocomplete value={value} {...props} />
}
