import Layout from '../../components/signDocument/Layout.jsx'
import styles from '../../styles/signDocument/text.module.css'

export default function SignDocument() {
  return (
    <div>
      <Layout>
        <div className={styles.container}>
          <h1 className={styles.title}>
            ¡El documento ha sido enviado con éxito!
          </h1>
          <p className={styles.text}>
            Se le enviará un correo dentro de unos días con el estatus de su
            envío.
          </p>
        </div>
      </Layout>
    </div>
  )
}
