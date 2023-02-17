import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import RestoreIcon from '@mui/icons-material/Restore'
import TextField from '@mui/material/TextField'
import styles from '../../../../styles/admin/shipments.module.css'

export default function Date({ date, setDate }) {
  return (
    <div className={styles.date}>
      <DesktopDatePicker
        label='Fecha de contrato'
        inputFormat='DD/MM/YYYY'
        disableFuture={true}
        value={date ? date : null}
        onChange={(value) => value && setDate(value)}
        renderInput={(params) => <TextField {...params} />}
      />
      <RestoreIcon onClick={() => setDate(null)} />
    </div>
  )
}
