import List from './List'
import styles from '../../../../../styles/admin/shipments.module.css'

export default function UsersList({ users }) {
  return (
    <div className={styles.clients}>
      <h1 className={styles.title}>Clientes</h1>
      <div className={styles.list}>
        {users.map(user => (
          <List key={user.idUser} user={user} />
        ))}
      </div>
    </div>
  )
}
