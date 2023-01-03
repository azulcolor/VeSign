import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

import { selectDocument } from '../../provider/sign/documentSlice'
import { SignLayout } from '../../components/layouts/index'
import styles from '../../styles/sign/text.module.css'
import Button from '../../components/general/Button'
import Error from '../../components/error/Error'

const PDFViewer = dynamic(
  () => import('../../components/general/document/PdfViewer'),
  {
    ssr: false,
  }
)

export default function Document() {
  const document = useSelector(selectDocument)
  const screenWidth = useRef(typeof window !== 'undefined' && window.innerWidth)

  if (!document.unsignedDocument || document.signed) {
    return <Error number={1} />
  }

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
          {screenWidth.current > 1023 && (
            <Button link={'canvas'}>Siguiente</Button>
          )}
        </div>

        <PDFViewer file={document.unsignedDocument} />
        {screenWidth.current < 1024 && (
          <Button link={'canvas'}>Siguiente</Button>
        )}
      </div>
    </SignLayout>
  )
}
