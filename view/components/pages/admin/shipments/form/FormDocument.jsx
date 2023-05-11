import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import styles from '../../../../../styles/admin/shipments.module.css'

export default function FormDocument({
  setProgress,
  options,
  formData,
  setFormData,
  send,
}) {
  const { contractNumber, template } = formData

  return (
    <div>
      <TextField
        required
        fullWidth
        id='contractNumber'
        label='Número de documento'
        variant='standard'
        value={contractNumber}
        onChange={e =>
          setFormData({ ...formData, contractNumber: e.target.value })
        }
      />

      <TextField
        fullWidth
        id='template'
        label='Template'
        variant='standard'
        value={template}
        select
        onChange={e => setFormData({ ...formData, template: e.target.value })}
      >
        {options.template.map(template => (
          <MenuItem key={template.id} value={template.id}>
            {template.label}
          </MenuItem>
        ))}
      </TextField>

      <div className={styles.leftArrowContainer}>
        <ArrowBackIcon
          className={styles.rightArrow}
          onClick={() => setProgress(false)}
        />
        <button onClick={send}>Enviar</button>
      </div>
    </div>
  )
}
