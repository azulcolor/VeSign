import TextField from '@mui/material/TextField'

import styles from '../../../../styles/admin/shipments.module.css'

export default function Form() {
  return (
    <div className={styles.form}>
      <TextField
        required
        fullWidth
        id='name'
        label='Nombre'
        variant='standard'
      />

      <TextField
        fullWidth
        id='email'
        label='Email'
        variant='standard'
        type='email'
      />
      <TextField
        id='phone'
        label='Extensión'
        variant='standard'
        type='number'
      />
      <TextField id='phone' label='Teléfono' variant='standard' type='number' />
      <TextField fullWidth id='idiom' label='Idioma' variant='standard' />
    </div>
  )
}
