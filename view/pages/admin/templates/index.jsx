import useSWR from 'swr'

import { AdminLayout } from '../../../components/layouts'
import FilterOfTemplates from '../../../components/pages/admin/shipments/templates/FilterOfTemplates'
import authenticatedRoute from '../../../components/pages/auth/authenticatedRoute'
import { fetcher } from '../../../hooks/api/fetcher'
import styles from '../../../styles/admin/shipments.module.css'
import {
  useFilterTemplateNames,
  useFilterTemplates,
  useOption,
} from '../../../hooks/components/admin/useFilter'
import { useState } from 'react'
import TemplatesView from '../../../components/pages/admin/shipments/templates/TemplatesView'

function Templates() {
  const [templateName, setTemplateName] = useState('')
  const [typeOfTemplate, setTypeOfTemplate] = useState('')

  let templatesData = useSWR('http://localhost:3000/api/template', fetcher)
  let options = useSWR('http://localhost:3000/api/client/options', fetcher)

  if (options.error || templatesData.error) return <div>failed to load</div>
  if (options.isLoading || templatesData.isLoading) return <div>loading...</div>

  const { templatesDataFiltered } = useFilterTemplates(
    templatesData,
    templateName,
    typeOfTemplate
  )

  const { templateNamesFiltered } = useFilterTemplateNames(templatesData)

  const { typeOfTemplates } = useOption(options)

  return (
    <AdminLayout>
      <div className={styles.row}>
        <FilterOfTemplates
          templateNames={templateNamesFiltered}
          setTemplateName={setTemplateName}
          typeOfTemplates={typeOfTemplates}
          setTypeOfTemplate={setTypeOfTemplate}
        />

        <div className={styles.templatesView}>
          <TemplatesView
            templatesDataFiltered={templatesDataFiltered}
            typeOfTemplates={typeOfTemplates}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default authenticatedRoute(Templates, { pathAterFailure: '/auth/login' })
