import { useState } from 'react'
import useSWR from 'swr'

import FormDocument from '../../../../components/pages/admin/shipments/form/FormDocument'
import { fetcher, sendDocument } from '../../../../hooks/api/fetcher'
import FormUser from '../../../../components/pages/admin/shipments/form/FormUser'
import Progress from '../../../../components/pages/admin/shipments/form/Progress'
import { AdminLayout } from '../../../../components/layouts'
import styles from '../../../../styles/admin/shipments.module.css'
import Error from '../../../../components/pages/admin/shipments/form/Error'
import authenticatedRoute from '../../../../components/pages/auth/authenticatedRoute'

function Send() {
  const [progress, setProgress] = useState(false)
  const [contractNumber, setContractNumber] = useState()
  const [template, setTemplate] = useState()
  const [fullName, setFullName] = useState()
  const [email, setEmail] = useState()
  const [areaCode, setAreaCode] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [idiom, setIdiom] = useState()
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
              contractNumber={contractNumber}
              setContractNumber={setContractNumber}
              template={template}
              setTemplate={setTemplate}
              send={() =>
                sendDocument(
                  fullName,
                  contractNumber,
                  email,
                  phoneNumber,
                  areaCode,
                  template,
                  idiom,
                  setError
                )
              }
            />
          ) : (
            <FormUser
              setProgress={setProgress}
              options={data.options}
              setFullName={setFullName}
              fullName={fullName}
              setEmail={setEmail}
              email={email}
              setAreaCode={setAreaCode}
              areaCode={areaCode}
              setPhoneNumber={setPhoneNumber}
              phoneNumber={phoneNumber}
              setIdiom={setIdiom}
              idiom={idiom}
            />
          )}
        </div>
        <Error errors={error} setError={setError} />
      </div>
    </AdminLayout>
  )
}

export default authenticatedRoute(Send, { pathAterFailure: '/auth/login' })
// export default authenticatedRoute(Shipment, { pathAterFailure: '/auth/login' })