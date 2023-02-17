import Form from '../../../components/admin/shipments/form/Form'
import Progress from '../../../components/admin/shipments/form/Progress'
import { AdminLayout } from '../../../components/layouts'
import styles from '../../../styles/admin/shipments.module.css'

export default function Send() {
  return (
    <AdminLayout>
      <div className={styles.send}>
        <div className={styles.formContainer}>
          <Progress />
          <Form />
        </div>
      </div>
    </AdminLayout>
  )
}
