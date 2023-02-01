import List from './List'
import styles from '../../../../styles/admin/shipments.module.css'

export default function ClientList({ clients }) {
  return (
    <div className={styles.clients}>
      <h1 className={styles.title}>Clientes</h1>
      <div className={styles.list}>
        {clients.map((client) => (
          <List client={client} />
        ))}
      </div>
    </div>
  )
}
