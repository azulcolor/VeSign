import axios from 'axios'
import { useRouter } from 'next/router'

import styles from '../../../../styles/admin/shipments.module.css'

export default function Button({ idStatus, idDocument }) {
  const router = useRouter()
  const path = router.asPath

  if (idStatus === 1)
    return (
      <button onClick={() => post(router, path, 5, idDocument)} className={styles.cancel}>Anular</button>
    ) 
  else if (idStatus === 2)
    return (
      <div>
        <button onClick={() => post(router, path, 4, idDocument)} className={styles.reject}>
          Rechazar
        </button>
        <button onClick={() => post(router, path, 3, idDocument)} className={styles.accept}>
          Aceptar
        </button>
      </div>
    )
  return
}

const post = async (router, path, idStatus, idDocument) => {
  await axios.patch(`http://localhost:3000/api/sendDocument/${idDocument}`, {
    idStatus,
  })
  
  router.reload(path)
}
