import axios from 'axios'

import styles from '../../../../../styles/admin/shipments.module.css'

const API = process.env.NEXT_PUBLIC_API_ROUTE

export default function Button({ idStatus, setIdStatus, idDocument }) {
  const post = async (status, idDocument) => {
    setIdStatus(status)
    await axios.patch(`${API}/sendDocument/${idDocument}`, {
      idStatus: status,
    })
  }

  if (idStatus === 1)
    return (
      <>
        <button onClick={() => post(5, idDocument)} className={styles.cancel}>
          Anular
        </button>
      </>
    )
  else if (idStatus === 2)
    return (
      <div>
        <button onClick={() => post(4, idDocument)} className={styles.reject}>
          Rechazar
        </button>
        <button onClick={() => post(3, idDocument)} className={styles.accept}>
          Aceptar
        </button>
      </div>
    )
  return
}
