import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import styles from '../../../../../styles/admin/shipments.module.css'

export default function FormUser({
  setProgress,
  options,
  formData,
  setFormData,
}) {
  const { fullName, email, areaCode, phoneNumber, idiom } = formData

  return (
    <div>
      <TextField
        required
        fullWidth
        id='name'
        label='Nombre'
        variant='standard'
        value={fullName}
        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
      />

      <TextField
        fullWidth
        id='email'
        label='Email'
        variant='standard'
        value={email}
        type='email'
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />

      <TextField
        id='areaCode'
        label='Extensión'
        variant='standard'
        value={areaCode}
        select
        onChange={e => setFormData({ ...formData, areaCode: e.target.value })}
      >
        {options.areaCode.map(areaCode => (
          <MenuItem key={areaCode} value={areaCode.idAreaCode}>
            {'+' + areaCode.areaCode}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id='phone'
        label='Teléfono'
        variant='standard'
        type='number'
        value={phoneNumber}
        onChange={e =>
          setFormData({ ...formData, phoneNumber: e.target.value })
        }
      />

      <TextField
        fullWidth
        id='idiom'
        label='Idioma'
        variant='standard'
        value={idiom}
        select
        onChange={e => setFormData({ ...formData, idiom: e.target.value })}
      >
        {options.idiom.map(idiom => (
          <MenuItem key={idiom.idIdiom} value={idiom.idIdiom}>
            {idiom.idiom}
          </MenuItem>
        ))}
      </TextField>

      <div className={styles.rightArrowContainer}>
        <ArrowForwardIcon
          className={styles.rightArrow}
          onClick={() => setProgress(true)}
        />
      </div>
    </div>
  )
}
