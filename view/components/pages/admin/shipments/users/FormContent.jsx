import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import styles from '../../../../../styles/admin/shipments.module.css'

export default function FormContent({ setEdit, user }) {
  return (
    <div className={styles.form}>
      <TextField
        id='username'
        label='Nombre de usuario'
        variant='standard'
        helperText={user.userName}
        onChange={(e) =>
          setEdit((value) => ({ ...value, userName: e.target.value }))
        }
      />

      <TextField
        id='name'
        label='Nombre completo'
        variant='standard'
        helperText={user.fullName}
        onChange={(e) =>
          setEdit((value) => ({ ...value, fullName: e.target.value }))
        }
      />

      <TextField
        id='rol'
        label='Rol'
        variant='standard'
        style={{ width: '32%' }}
        helperText={user.rol}
        select
        onChange={(e) =>
          setEdit((value) => ({ ...value, idRol: e.target.value }))
        }
      >
        {rol.map((rol) => (
          <MenuItem key={rol} value={rol.idRol}>
            {rol.rolName}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id='password'
        label='Contraseña'
        variant='standard'
        helperText={'No olvides tu contraseña'}
        onChange={(e) =>
          setEdit((value) => ({ ...value, userPassword: e.target.value }))
        }
      />
    </div>
  )
}

const rol = [
  {
    idRol: 1,
    rolName: 'Socio',
  },
  {
    idRol: 2,
    rolName: 'Sala',
  },
  {
    idRol: 3,
    rolName: 'Administrador',
  },
]
