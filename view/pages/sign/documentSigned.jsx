import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

import { selectDocument, setSigned } from '../../provider/sign/documentSlice'
import { SignLayout } from '../../components/layouts/index'
import styles from '../../styles/sign/text.module.css'
import style from '../../styles/general/button.module.css'
import Button from '../../components/general/Button'
import { veSignApi } from '../../api'
import Error from '../../components/error/Error'

const PDFViewer = dynamic(
  () => import('../../components/general/document/PdfViewer'),
  {
    ssr: false,
  }
)

const sendDocument = async (document, dispatch) => {
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
    dispatch(setSigned(true))
    console.log(data)
  } catch (error) {
    console.log('error', error)
  }
}

export default function DocumentSigned() {
  const document = useSelector(selectDocument)
  const screenWidth = useRef(typeof window !== 'undefined' && window.innerWidth)
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
                onClick={() => sendDocument(document, dispatch)}
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
              onClick={() => sendDocument(document, dispatch)}
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
