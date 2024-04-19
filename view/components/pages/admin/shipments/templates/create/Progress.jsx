import styles from '../../../../../../styles/admin/shipments.module.css'
import DescriptionIcon from '@mui/icons-material/Description';

export default function Progress() {
  return (
    <div className={styles.progress}>
      <div className={styles.fullCircle}>
        <DescriptionIcon className={styles.icon} />
      </div>
    </div>
  )
}
