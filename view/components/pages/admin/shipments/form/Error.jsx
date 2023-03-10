import { Alert } from '@mui/material'

export default function Error({ errors }) {
  if (errors.length === 0) return null

  return (
    <div style={{ position: 'absolute', bottom: '60%', right: '30px' }}>
      {errors.map((err) => {
        return (
          <Alert
            style={{ marginBottom: '20px' }}
            variant='outlined'
            severity='error'
          >
            {err}
          </Alert>
        )
      })}
    </div>
  )
}
