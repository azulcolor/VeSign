import { AdminLayout } from '../../../components/layouts'
import authenticatedRoute from '../../../components/pages/auth/authenticatedRoute'

function Users() {
  return (
    <AdminLayout>
      <h1>Users</h1>
    </AdminLayout>
  )
}

export default authenticatedRoute(Users, { pathAterFailure: '/auth/login' })
