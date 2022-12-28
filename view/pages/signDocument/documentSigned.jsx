import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import { selectDocument } from '../../provider/signDocument/documentSlice'
import Layout from '../../components/signDocument/Layout'
import styles from '../../styles/signDocument/text.module.css'
import style from '../../styles/general/button.module.css'
import Button from '../../components/general/Button'

const PDFViewer = dynamic(() => import('../../components/general/PdfViewer'), {
  ssr: false,
})

export default function DocumentSigned() {
  const document = useSelector(selectDocument)
  const screenWidth = useRef(typeof window !== 'undefined' && window.innerWidth)
  return (
    <Layout>
      <div className={styles.containerDocument}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>¡Su documento ha sido firmado!</h1>
          <p className={styles.text}>
            Por favor lea el documento con cuidado. Si deseas enviarlo presione
            el boton de Enviar y si quiere volver a hacer la firma presione
            Regresar
          </p>
          {screenWidth.current > 767 && <Button link={'sent'}>Enviar</Button>}
        </div>
        <PDFViewer file={document.signedDocument} screenWidth={screenWidth} />
        {screenWidth.current < 768 && <Button link={'sent'}>Enviar</Button>}
        <Link href='/signDocument/sign' className={style.back}>
          Regresar
        </Link>
      </div>
    </Layout>
  )
}
