import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import styles from '../../../../../styles/admin/shipments.module.css'

export default function FormContent({ setEdit, data, typeOfTemplates }) {
  return (
    <div className={styles.form}>
      <TextField
        id='templateName'
        label='Nombre del template'
        variant='standard'
        helperText={data.pdfName}
        onChange={e =>
          setEdit(value => ({ ...value, pdfName: e.target.value }))
        }
      />

      <TextField
        id='typeOfTemplate'
        label='Tipo de template'
        variant='standard'
        style={{ width: '32%' }}
        helperText={data.documentType}
        select
        onChange={e => setEdit(value => ({ ...value, idType: e.target.value }))}
      >
        {typeOfTemplates.map(typeOfTemplate => (
          <MenuItem key={typeOfTemplate.id} value={typeOfTemplate.id}>
            {typeOfTemplate.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}
