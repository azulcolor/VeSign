import { SignLayout } from '../../components/layouts/index'
import styles from '../../styles/sign/text.module.css'

export default function sign() {
  return (
    <div>
      <SignLayout>
        <div className={styles.container}>
          <h1 className={styles.title}>
            ¡El documento ha sido enviado con éxito!
          </h1>
          <p className={styles.text}>
            Se le enviará un correo dentro de unos días con el estatus de su
            envío.
          </p>
        </div>
      </SignLayout>
    </div>
  )
}
