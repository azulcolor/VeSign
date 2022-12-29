import Canvas from '../../components/signDocument/sign/Canvas'
import Layout from '../../components/signDocument/Layout'
import styles from '../../styles/signDocument/text.module.css'

export default function Sign() {
  return (
    <>
      <Layout>
        <div className={styles.canvasContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>¿Listo para firmar?</h1>
            <p className={styles.text}>
              Por favor ingrese su firma en el recuadro y presione el botón de
              Firmar cuando esté satisfecho
            </p>
          </div>
          <Canvas />
        </div>
      </Layout>
    </>
  )
}
