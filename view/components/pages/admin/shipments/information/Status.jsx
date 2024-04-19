import styles from '../../../../../styles/admin/shipments.module.css'

export default function Data({  info, idStatus }) {

    const color = () => {
    if (idStatus === 1) return '#607d8b'
    else if (idStatus === 2) return '#607d8b'
    else if (idStatus === 3) return '#4a88ff'
    else if (idStatus === 4) return '#e22424'
    else if (idStatus === 5) return '#e29624'
    }

    const status = () => {
      if (idStatus === 1) return 'Enviado'
      else if (idStatus === 2) return 'Firmado'
      else if (idStatus === 3) return 'Aceptado'
      else if (idStatus === 4) return 'Rechazado'
      else if (idStatus === 5) return 'Anulado'
    }


  return (
    <div className={styles.dataColumn}>
      <p className={styles.data} style={{color: color()}}>{status()}</p>
      <h1 className={styles.dataTitle}>Estado</h1>
    </div>
  )
}
