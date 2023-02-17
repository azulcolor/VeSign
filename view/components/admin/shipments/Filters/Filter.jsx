import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function Filter({ id, options, label, set }) {
  return (
    <Autocomplete
      id={id}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label={label} variant='standard' />
      )}
      onChange={(event, value) =>
        value
          ? set(typeof value === 'string' ? value : value.id)
          : set(typeof options[0] === 'string' ? '' : null)
      }
    />
  )
}
