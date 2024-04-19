import { useSelector } from 'react-redux'

import Canvas from '../../components/pages/sign/canvas/Canvas'
import styles from '../../styles/sign/text.module.css'
import Error from '../../components/error/Error'

import { selectDocument } from '../../provider/sign/documentSlice'
import { SignLayout } from '../../components/layouts/index'

export default function Sign() {
  const document = useSelector(selectDocument)

  if (!document.unsignedDocument || document.signed) {
    return <Error number={3} />
  }

  return (
    <SignLayout>
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
    </SignLayout>
  )
}
