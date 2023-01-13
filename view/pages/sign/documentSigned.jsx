import Link from 'next/link'
import dynamic from 'next/dynamic'

import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from '../../styles/sign/text.module.css'
import style from '../../styles/general/button.module.css'
import Button from '../../components/general/Button'
import Error from '../../components/error/Error'

import { selectDocument } from '../../provider/sign/documentSlice'
import { SignLayout } from '../../components/layouts/index'
import { useSendDocument } from '../../hooks/documents/useSendDocument'

const PDFViewer = dynamic(
  () => import('../../components/general/document/PdfViewer'),
  {
    ssr: false,
  }
)

export default function DocumentSigned() {
  const screenWidth = useRef(typeof window !== 'undefined' && window.innerWidth)

  const document = useSelector(selectDocument)
  const dispatch = useDispatch()

  if (!document.unsignedDocument || document.signed) {
    return <Error number={4} />
  }

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

          {screenWidth.current > 1023 && (
            <>
              <Button
                link={'sent'}
                onClick={() => useSendDocument(dispatch, document)}
              >
                Enviar
              </Button>
              <Link href='canvas' className={style.back}>
                Regresar
              </Link>
            </>
          )}
        </div>

        <PDFViewer file={document.signedDocument} />
        {screenWidth.current < 1024 && (
          <>
            <Button
              link={'sent'}
              onClick={() => useSendDocument(dispatch, document)}
            >
              Enviar
            </Button>
            <Link href='canvas' className={style.back}>
              Regresar
            </Link>
          </>
        )}
      </div>
    </SignLayout>
  )
}
