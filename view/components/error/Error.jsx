import styles from '../../styles/error.module.css'
import CatImage from './catImage'

import { SignLayout } from '../layouts'

export default function Error({ number }) {
  return (
    <SignLayout>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Ups! algo salió mal :(</h1>
          <p className={styles.text}>
            Por favor vuelva a ingresar al link de firma
          </p>
        </div>

        <CatImage number={number} />
      </div>
    </SignLayout>
  )
}
