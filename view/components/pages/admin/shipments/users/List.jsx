import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DeleteIcon from '@mui/icons-material/Delete'

import { deleteUser } from '../../../../../hooks/api/fetcher'
import styles from '../../../../../styles/admin/shipments.module.css'
import Form from './Form'

const MySwal = withReactContent(Swal)

const del = (id) => {
  MySwal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esta acción',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#FA6161',
    confirmButtonColor: '#4a88ff',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Eliminar',
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        deleteUser(id)

        MySwal.fire(
          'Eliminado',
          'El usuario ha sido eliminado con éxito',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        })
      } catch (error) {
        MySwal.fire('Error', 'Ha ocurrido un error', 'error')
      }
    }
  })
}

export default function List({ user }) {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState({})

  console.log(edit)

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{ color: 'inherit', textDecoration: 'none' }}
        className={styles.element}
        onClick={() => setOpen(true)}
      >
        <p className={styles.name}>{user.fullName}</p>
        <div className={styles.status}>
          <p>{user.rol}</p>
        </div>
      </div>

      <DeleteIcon className={styles.delete} onClick={() => del(user.idUser)} />
      <Form
        open={open}
        setOpen={setOpen}
        setEdit={setEdit}
        edit={edit}
        user={user}
      />
    </div>
  )
}
