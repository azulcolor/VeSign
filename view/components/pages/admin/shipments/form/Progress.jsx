import styles from '../../../../../styles/admin/shipments.module.css'
import PersonIcon from '@mui/icons-material/Person'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

export default function Progress({ progress }) {
  return (
    <div className={styles.progress}>
      <div className={styles.fullCircle}>
        <PersonIcon className={styles.icon} />
      </div>
      <div className={styles.line}></div>
      <div className={progress ? styles.fullCircle : styles.circle}>
        {progress && <InsertDriveFileIcon className={styles.icon} />}
      </div>
    </div>
  )
}
