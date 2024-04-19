import Stack from '@mui/material/Stack'
import Link from 'next/link'

import styles from '../../../../../styles/admin/shipments.module.css'
import Filter from '../filters/Filter'

export default function UsersFilter({ fullname, setFullname, rol, setRol }) {
  return (
    <div className={styles.filter}>
      <Link href='/admin/users/create' className={styles.animation}>
        Crear usuario
      </Link>
      <div>
        <h1 className={styles.title}>Filtros</h1>
        <Stack spacing={2} sx={{ width: 300 }}>
          <Filter
            id={'fullname'}
            options={fullname}
            label={'Nombre'}
            set={setFullname}
          />

          <Filter id={'rol'} options={rol} label={'Rol'} set={setRol} />
        </Stack>
      </div>
    </div>
  )
}
