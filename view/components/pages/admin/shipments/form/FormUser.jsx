import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import styles from '../../../../../styles/admin/shipments.module.css'

export default function FormUser(props) {
  return (
    <div className={styles.form}>
      <TextField
        required
        fullWidth
        id='name'
        label='Nombre'
        variant='standard'
        value={props.fullName}
        onChange={(e) => props.setFullName(e.target.value)}
      />

      <TextField
        fullWidth
        id='email'
        label='Email'
        variant='standard'
        value={props.email}
        type='email'
        onChange={(e) => props.setEmail(e.target.value)}
      />
      <TextField
        id='areaCode'
        label='Extensión'
        variant='standard'
        value={props.areaCode}
        select
        onChange={(e) => props.setAreaCode(e.target.value)}
      >
        {props.options.areaCode.map((areaCode) => (
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
        value={props.phoneNumber}
        onChange={(e) => props.setPhoneNumber(e.target.value)}
      />
      <TextField
        fullWidth
        id='idiom'
        label='Idioma'
        variant='standard'
        value={props.idiom}
        select
        onChange={(e) => props.setIdiom(e.target.value)}
      >
        {props.options.idiom.map((idiom) => (
          <MenuItem key={idiom.idIdiom} value={idiom.idIdiom}>
            {idiom.idiom}
          </MenuItem>
        ))}
      </TextField>
      <div className={styles.rightArrowContainer}>
        <ArrowForwardIcon
          className={styles.rightArrow}
          onClick={() => props.setProgress(true)}
        />
      </div>
    </div>
  )
}
