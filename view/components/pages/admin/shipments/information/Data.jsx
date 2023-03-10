import styles from '../../../../../styles/admin/shipments.module.css'

export default function Data({ title, info }) {
  return (
    <div className={styles.dataColumn}>
      <p className={styles.data}>{info}</p>
      <h1 className={styles.dataTitle}>{title}</h1>
    </div>
  )
}
