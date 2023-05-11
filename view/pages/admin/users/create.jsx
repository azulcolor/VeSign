import { useState } from 'react'

import { AdminLayout } from '../../../components/layouts'
import Button from '../../../components/general/Button'
import CreateForm from '../../../components/pages/admin/shipments/users/create/CreateForm'
import Progress from '../../../components/pages/admin/shipments/users/create/Progress'
import authenticatedRoute from '../../../components/pages/auth/authenticatedRoute'
import Error from '../../../components/pages/admin/shipments/form/Error'
import { createUser } from '../../../hooks/api/fetcher'

function Create() {
  const [errors, setErrors] = useState([])
  const [userData, setUserData] = useState({})

  return (
    <AdminLayout>
      <Progress />
      <CreateForm setUserData={setUserData} />
      <Button onClick={() => createUser(userData, setErrors)}>Enviar</Button>
      <Error errors={errors} />
    </AdminLayout>
  )
}

export default authenticatedRoute(Create, { pathAterFailure: '/auth/login' })
