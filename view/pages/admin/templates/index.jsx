import { AdminLayout } from '../../../components/layouts'
import authenticatedRoute from '../../../components/pages/auth/authenticatedRoute'

function Templates() {
  return (
    <AdminLayout>
      <h1>Templates</h1>
    </AdminLayout>
  )
}

export default authenticatedRoute(Templates, { pathAterFailure: '/auth/login' })
