import { useSelector } from 'react-redux'

import Canvas from '../../components/sign/canvas/Canvas'
import { selectDocument } from '../../provider/sign/documentSlice'
import { SignLayout } from '../../components/layouts/index'
import styles from '../../styles/sign/text.module.css'
import Error from '../../components/error/Error'

export default function Sign() {
  const document = useSelector(selectDocument)

  console.log(document)

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
