import { useState } from 'react'
import useSWR from 'swr'
import { AdminLayout } from '../../../../components/layouts'
import { fetcher, sendDocument } from '../../../../hooks/api/fetcher'
import authenticatedRoute from '../../../../components/pages/auth/authenticatedRoute'
import Error from '../../../../components/pages/admin/shipments/form/Error'
import Progress from '../../../../components/pages/admin/shipments/form/Progress'
import FormDocument from '../../../../components/pages/admin/shipments/form/FormDocument'
import FormUser from '../../../../components/pages/admin/shipments/form/FormUser'
import styles from '../../../../styles/admin/shipments.module.css'

function Send() {
  const [progress, setProgress] = useState(false)
  const [formData, setFormData] = useState({
    idUser: 1,
  })
  const [error, setError] = useState([])

  const options = useSWR('http://localhost:3000/api/client/options', fetcher)

  if (options.error) return <div>failed to load</div>
  if (options.isLoading) return <div>loading...</div>

  const { data } = options

  return (
    <AdminLayout>
      <div className={styles.send}>
        <div className={styles.formContainer}>
          <Progress progress={progress} />
          {progress ? (
            <FormDocument
              setProgress={setProgress}
              options={data.options}
              formData={formData}
              setFormData={setFormData}
              send={() => sendDocument(formData, setError)}
            />
          ) : (
            <FormUser
              setProgress={setProgress}
              options={data.options}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
        <Error errors={error} />
      </div>
    </AdminLayout>
  )
}

export default authenticatedRoute(Send, { pathAterFailure: '/auth/login' })
