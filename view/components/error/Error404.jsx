import styles from '../../styles/error.module.css'
import CatImage from './CatImage'

import { SignLayout } from '../layouts'

export default function Error404({ number }) {
  return (
    <SignLayout>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Ups! No pudimos encontrar la página que estaba buscando :(</h1>
          <p className={styles.text}>
            Asegúrese de entrar a la página correcta
          </p>
        </div>

        <CatImage number={number} />
      </div>
    </SignLayout>
  )
}
