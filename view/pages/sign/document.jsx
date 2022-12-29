import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

import { selectDocument } from '../../provider/sign/documentSlice'
import { SignLayout } from '../../components/layouts/index'
import styles from '../../styles/sign/text.module.css'
import Button from '../../components/general/Button'

const PDFViewer = dynamic(
  () => import('../../components/general/document/PdfViewer'),
  {
    ssr: false,
  }
)

export default function Document() {
  const document = useSelector(selectDocument)
  const screenWidth = useRef(typeof window !== 'undefined' && window.innerWidth)
  return (
    <SignLayout>
      <div className={styles.containerDocument}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Documento a firmar</h1>
          <p className={styles.text}>
            Por favor lea el documento con cuidado, para cambiar de página
            presione las flechas. Cuando esté listo para firmar presione el
            botón de Siguiente
          </p>
          {screenWidth.current > 767 && (
            <Button link={'canvas'}>Siguiente</Button>
          )}
        </div>
        <PDFViewer file={document.unsignedDocument} screenWidth={screenWidth} />
        {screenWidth.current < 768 && <Button link={'canvas'}>Siguiente</Button>}
      </div>
    </SignLayout>
  )
}
