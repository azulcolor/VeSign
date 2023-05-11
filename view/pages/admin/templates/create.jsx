import { useState } from 'react'
import useSWR from 'swr'

import { AdminLayout } from '../../../components/layouts'
import authenticatedRoute from '../../../components/pages/auth/authenticatedRoute'
import CreateForm from '../../../components/pages/admin/shipments/templates/create/CreateForm'
import Progress from '../../../components/pages/admin/shipments/templates/create/Progress'
import { useOption } from '../../../hooks/components/admin/useFilter'
import { createTemplate, fetcher } from '../../../hooks/api/fetcher'
import Button from '../../../components/general/Button'
import Error from '../../../components/pages/admin/shipments/form/Error'

function Create() {
  const [errors, setErrors] = useState([])
  const [templateData, setTemplateData] = useState()

  let options = useSWR('http://localhost:3000/api/client/options', fetcher)

  if (options.error) return <div>failed to load</div>
  if (options.isLoading) return <div>loading...</div>

  const { typeOfTemplates } = useOption(options)

  return (
    <AdminLayout>
      <Progress />
      <CreateForm
        setTemplateData={setTemplateData}
        typeOfTemplates={typeOfTemplates}
      />

      <Button onClick={() => createTemplate(templateData, setErrors)}>
        Crear template
      </Button>

      <Error errors={errors} />
    </AdminLayout>
  )
}

export default authenticatedRoute(Create, { pathAterFailure: '/auth/login' })
