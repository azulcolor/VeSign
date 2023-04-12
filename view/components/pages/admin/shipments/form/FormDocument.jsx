import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import styles from '../../../../../styles/admin/shipments.module.css'

export default function FormDocument(props) {
  return (
    <div>
      <TextField
        required
        fullWidth
        id='contractNumber'
        label='Número de documento'
        variant='standard'
        value={props.contractNumber}
        onChange={(e) => props.setContractNumber(e.target.value)}
      />

      <TextField
        fullWidth
        id='template'
        label='Template'
        variant='standard'
        value={props.template}
        select
        onChange={(e) => props.setTemplate(e.target.value)}
      >
        {props.options.template.map((template) => (
          <MenuItem key={template.idTemplate} value={template.idTemplate}>
            {template.pdfName}
          </MenuItem>
        ))}
      </TextField>

      <div className={styles.leftArrowContainer}>
        <ArrowBackIcon
          className={styles.rightArrow}
          onClick={() => props.setProgress(false)}
        />
        <button onClick={props.send}>Enviar</button>
      </div>
    </div>
  )
}
