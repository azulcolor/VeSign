import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

import { deleteUser } from '../../../../../hooks/api/fetcher'
import styles from '../../../../../styles/admin/shipments.module.css'
import Form from './Form'
import FormContent from './FormContent'
import { updateUser } from '../../../../../hooks/api/fetcher'
import { deleteAlert } from '../../../../../services/sweetAlert'

export default function List({ user }) {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState()

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

      <DeleteIcon
        className={styles.delete}
        onClick={() => deleteAlert(deleteUser, user.idUser)}
      />
      <Form
        open={open}
        setOpen={setOpen}
        setEdit={setEdit}
        updateById={updateUser}
        edit={edit}
        id={user.idUser}
      >
        <FormContent setEdit={setEdit} user={user} />
      </Form>
    </div>
  )
}
