
import Canvas from '../../components/signDocument/Canvas'
import Layout from '../../components/signDocument/layout'
import style from '../../styles/signDocument/text.module.css'

export default function Sign() {
  return (
    <>
      <Layout>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          <div className={style.textContainer}>
            <h1 className={style.title}>¿Listo para firmar?</h1>
            <p className={style.text}>
              Por favor ingrese su firma en el recuadro y presione el botón de
              Firmar cuando esté satisfecho
            </p>
          </div>
          <Canvas/>
        </div>
      </Layout>
    </>
  )
}
