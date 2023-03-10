import Icon from './Icon'
import styles from '../../../../../styles/admin/shipments.module.css'
import Link from 'next/link'

export default function List({ client }) {
  return (
    <Link href={`shipments/${client.idDocument}`} style={{ color: 'inherit', textDecoration: 'none' }}>
      <div className={styles.element}>
        <p className={styles.name}>{client.fullname}</p>
        <div className={styles.status}>
          <Icon status={client.idStatus} />
          <p>{client.statusName}</p>
        </div>
      </div>
    </Link>
  )
}
