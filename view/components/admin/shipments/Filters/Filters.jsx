import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import styles from '../../../../styles/admin/shipments.module.css'

export default function Filters({
  name,
  setName,
  status,
  setStatus,
  document,
  setDocument,
  setDate,
  date,
  contract,
  setContract,
}) {
  return (
    <div className={styles.filter}>
      <h1 className={styles.title}>Filtros</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3} sx={{ width: 300 }}>
          <Autocomplete
            id='name'
            options={name}
            renderInput={(params) => (
              <TextField {...params} label='Nombres' variant='standard' />
            )}
            onChange={(event, value) => (value ? setName(value) : setName(''))}
          />
          <Autocomplete
            id='estatus'
            options={status}
            renderInput={(params) => (
              <TextField {...params} label='Estatus' variant='standard' />
            )}
            onChange={(event, value) =>
              value ? setStatus(value.id) : setStatus(null)
            }
          />
          <Autocomplete
            id='Documento'
            options={document}
            renderInput={(params) => (
              <TextField {...params} label='Documento' variant='standard' />
            )}
            onChange={(event, value) =>
              value ? setDocument(value.id) : setDocument(null)
            }
          />
          <Autocomplete
            id='Contract'
            options={contract}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Número de contrato'
                variant='standard'
              />
            )}
            onChange={(event, value) =>
              value ? setContract(value) : setContract('')
            }
          />

          <DesktopDatePicker
            label='Fecha de contrato'
            inputFormat='DD/MM/YYYY'
            disableFuture={true}
            value={date ? date : null}
            onChange={(value) => value && setDate(value)}
            renderInput={(params) => <TextField {...params} />}
          />
          <button onClick={() => setDate(null)}>Resetear fecha</button>
        </Stack>
      </LocalizationProvider>
    </div>
  )
}
