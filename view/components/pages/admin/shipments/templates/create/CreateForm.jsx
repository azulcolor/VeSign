import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Input, MenuItem } from '@mui/material'

import { handlePdfUpload } from '../../../../../../services/handlePdfUpload'

export default function CreateForm({ setTemplateData, typeOfTemplates }) {
  const [selectedFile, setSelectedFile] = useState(null)

  return (
    <div style={{ width: '22vw', marginBottom: '6vh' }}>
      <TextField
        required
        id='templateName'
        label='Nombre del documento'
        variant='standard'
        style={{ width: '22vw', marginTop: '1vh' }}
        onChange={e =>
          setTemplateData(value => ({ ...value, pdfName: e.target.value }))
        }
      />

      <TextField
        required
        id='typeOfTemplate'
        label='Tipo de documento'
        variant='standard'
        style={{ width: '22vw', marginTop: '2vh' }}
        select
        onChange={e =>
          setTemplateData(value => ({ ...value, idType: e.target.value }))
        }
      >
        {typeOfTemplates.map(typeOfTemplate => (
          <MenuItem key={typeOfTemplate} value={typeOfTemplate.id}>
            {typeOfTemplate.label}
          </MenuItem>
        ))}
      </TextField>

      <div style={{ marginTop: '4vh' }}>
        <Input
          required
          id='pdfInput'
          type='file'
          inputProps={{ accept: 'application/pdf' }}
          onChange={e => handlePdfUpload(e, setTemplateData, setSelectedFile)}
          style={{ display: 'none' }}
        />
        <label htmlFor='pdfInput'>
          <Button variant='contained' component='span'>
            {selectedFile ? selectedFile : 'Cargar documento'}
          </Button>
        </label>
      </div>
    </div>
  )
}
