import useSWR from 'swr'
import { fetcher } from '../../../hooks/api/fetcher'
import { useState } from 'react'

import { AdminLayout } from '../../../components/layouts'
import UsersList from '../../../components/pages/admin/shipments/users/usersList'
import authenticatedRoute from '../../../components/pages/auth/authenticatedRoute'
import styles from '../../../styles/admin/shipments.module.css'
import UsersFilter from '../../../components/pages/admin/shipments/users/UsersFilter'
import {
  useFilterUser,
  useUser,
} from '../../../hooks/components/admin/useFilter'
import Link from 'next/link'

function Users() {
  const [fullName, setFullName] = useState('')
  const [rol, setRol] = useState()

  let users = useSWR('http://localhost:3000/api/auth/user', fetcher)

  if (users.isLoading) return <div>loading...</div>
  if (users.error) return <div>failed to load</div>

  let { filter } = useFilterUser(fullName, rol, users)
  let { filterName, filterRol } = useUser(users)

  return (
    <AdminLayout>
      <div className={styles.column}>
        <UsersFilter
          fullname={filterName}
          setFullname={setFullName}
          rol={filterRol}
          setRol={setRol}
        />
        <UsersList users={filter} />
      </div>
    </AdminLayout>
  )
}

export default authenticatedRoute(Users, { pathAterFailure: '/auth/login' })
