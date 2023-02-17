import styles from '../../../../styles/admin/shipments.module.css'
import PersonIcon from '@mui/icons-material/Person';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function Progress() {
  return (
    <div className={styles.progress}>
      <div className={styles.fullCircle}>
        <PersonIcon className={styles.icon}/>
      </div>
      <div className={styles.line}></div>
      <div className={styles.fullCircle}>
        <InsertDriveFileIcon className={styles.icon}/>
      </div>
    </div>
  )
}
