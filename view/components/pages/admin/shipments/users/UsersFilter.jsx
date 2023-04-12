import Stack from '@mui/material/Stack'

import styles from '../../../../../styles/admin/shipments.module.css'
import Filter from '../filters/Filter'

export default function UsersFilter({ fullname, setFullname, rol, setRol }) {
  return (
    <div className={styles.filter}>
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
  )
}
