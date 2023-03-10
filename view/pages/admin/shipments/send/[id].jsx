import { useRouter } from 'next/router'
import { AdminLayout } from '../../../../components/layouts'
import Button from '../../../../components/general/Button'
import Link from 'next/link'
import styles from '../../../../styles/admin/shipments.module.css'

export default function sendMessage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <AdminLayout>
      <div className={styles.messageContainer}>
        <h2 className={styles.messageTitle}>
          ¡Se ha enviado el documento satisfactoriamente!
        </h2>
        <p className={styles.messageText}>
          Si quiere ver la información del envío presione Ver información y si
          quiere realizar una nueva encuesta presione Realizar envío
        </p>
        <div className={styles.messageButtons}>
          <Link href={`/admin/shipments/${id}`} className={styles.messageView}>Ver envío</Link>
          <Button link={`/admin/shipments/send`}>Realizar envío</Button>
        </div>
      </div>
    </AdminLayout>
  )
}
