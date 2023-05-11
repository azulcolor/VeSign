import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import styles from '../../../../../styles/admin/shipments.module.css'
import Filter from './Filter'
import Date from './Date'

export default function Filters({
  filters: { filterName, filterStatus, filterDocument, filterContract, date },
  setFilters: { setName, setStatus, setDocument, setContract, setDate },
}) {
  return (
    <div className={styles.shipmentFilter}>
      <h1 className={styles.title}>Filtros</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3} sx={{ maxWidth: '100%', '& > *': { width: '100%' } }}>
          <Filter
            id={'name'}
            options={filterName}
            label={'Nombres'}
            set={setName}
          />

          <Filter
            id={'status'}
            options={filterStatus}
            label={'Estatus'}
            set={setStatus}
          />

          <Filter
            id={'document'}
            options={filterDocument}
            label={'Documento'}
            set={setDocument}
          />

          <Filter
            id={'contract'}
            options={filterContract}
            label={'Contrato'}
            set={setContract}
          />

          <Date date={date} setDate={setDate} />
        </Stack>
      </LocalizationProvider>
    </div>
  )
}
