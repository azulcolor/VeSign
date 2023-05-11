import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

export default function CreateForm({ setUserData }) {
  return (
    <div style={{ width: '22vw', marginBottom: '6vh' }}>
      <TextField
        required
        id='name'
        label='Nombre de usuario'
        variant='standard'
        style={{ width: '22vw', marginTop: '1vh' }}
        onChange={(e) =>
          setUserData((value) => ({ ...value, userName: e.target.value }))
        }
      />
      <TextField
        required
        id='email'
        label='Email'
        variant='standard'
        type='email'
        style={{ width: '22vw', marginTop: '1vh' }}
        onChange={(e) =>
          setUserData((value) => ({ ...value, userEmail: e.target.value }))
        }
      />
      <TextField
        required
        id='fullname'
        label='Nombre completo'
        variant='standard'
        style={{ width: '22vw', marginTop: '1vh' }}
        onChange={(e) =>
          setUserData((value) => ({ ...value, fullName: e.target.value }))
        }
      />
      <TextField
        required
        id='password'
        label='Contraseña'
        variant='standard'
        style={{ width: '22vw', marginTop: '1vh' }}
        type='password'
        onChange={(e) =>
          setUserData((value) => ({ ...value, userPassword: e.target.value }))
        }
      />
      <TextField
        required
        id='rol'
        label='Rol'
        variant='standard'
        style={{ width: '22vw', marginTop: '2vh' }}
        select
        onChange={(e) =>
          setUserData((value) => ({ ...value, idRol: e.target.value }))
        }
      >
        {rol.map((rol) => (
          <MenuItem key={rol} value={rol.idRol}>
            {rol.rolName}
          </MenuItem>
        ))}
      </TextField>
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
