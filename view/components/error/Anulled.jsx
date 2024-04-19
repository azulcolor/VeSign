import styles from '../../styles/error.module.css'
import CatImage from './CatImage'

import { SignLayout } from '../layouts'

export default function Anulled({ number }) {
  return (
    <SignLayout>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            El envío de su documento ha sido anulado :(
          </h1>
          <p className={styles.text}>
            Póngase en contacto con nosotros por cualquier duda
          </p>
        </div>

        <CatImage number={number} />
      </div>
    </SignLayout>
  )
}
