import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import { selectDocument } from '../../provider/sign/documentSlice'
import { SignLayout } from '../../components/layouts/index'
import styles from '../../styles/sign/text.module.css'
import style from '../../styles/general/button.module.css'
import Button from '../../components/general/Button'
import { veSignApi } from '../../api'

const PDFViewer = dynamic(
  () => import('../../components/general/document/PdfViewer'),
  {
    ssr: false,
  }
)

const sendDocument = async (document) => {
  const idDocument = document.idDocument
  const signedDocument = document.signedDocument
  const sign = document.sign

  try {
    const { data } = await veSignApi.patch(
      `/clientDocument/send/${idDocument}`,
      {
        sign,
        signedDocument,
      }
    )
    console.log(data)
  } catch (error) {
    console.log('error', error)
  }
}

export default function DocumentSigned() {
  const document = useSelector(selectDocument)
  const screenWidth = useRef(typeof window !== 'undefined' && window.innerWidth)
  return (
    <SignLayout>
      <div className={styles.containerDocument}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>¡Su documento ha sido firmado!</h1>
          <p className={styles.text}>
            Por favor lea el documento con cuidado. Si deseas enviarlo presione
            el boton de Enviar y si quiere volver a hacer la firma presione
            Regresar
          </p>
          {screenWidth.current > 767 && (
            <>
              <Button link={'sent'} onClick={() => sendDocument(document)}>
                Enviar
              </Button>
              <Link href='sign' className={style.back}>
                Regresar
              </Link>
            </>
          )}
        </div>
        <PDFViewer file={document.signedDocument} screenWidth={screenWidth} />
        {screenWidth.current < 768 && (
          <>
            <Button link={'sent'} onClick={() => sendDocument(document)}>
              Enviar
            </Button>
            <Link href='sign' className={style.back}>
              Regresar
            </Link>
          </>
        )}
      </div>
    </SignLayout>
  )
}
