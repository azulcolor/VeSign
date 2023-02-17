import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import styles from '../../../../styles/admin/shipments.module.css'
import Filter from './Filter'
import Date from './Date'

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
          <Filter id={'name'} options={name} label={'Nombres'} set={setName} />

          <Filter
            id={'status'}
            options={status}
            label={'Estatus'}
            set={setStatus}
          />

          <Filter
            id={'document'}
            options={document}
            label={'Documento'}
            set={setDocument}
          />

          <Filter
            id={'contract'}
            options={contract}
            label={'Contrato'}
            set={setContract}
          />

          <Date date={date} setDate={setDate} />
        </Stack>
      </LocalizationProvider>
    </div>
  )
}
