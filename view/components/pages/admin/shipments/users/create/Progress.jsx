import styles from '../../../../../../styles/admin/shipments.module.css'
import PersonIcon from '@mui/icons-material/Person'

export default function Progress() {
  return (
    <div className={styles.progress}>
      <div className={styles.fullCircle}>
        <PersonIcon className={styles.icon} />
      </div>
    </div>
  )
}
