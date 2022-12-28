import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import { selectDocument } from '../../provider/signDocument/documentSlice'
import Layout from '../../components/signDocument/Layout'
import styles from '../../styles/signDocument/text.module.css'
import style from '../../styles/general/button.module.css'
import Button from '../../components/general/Button'
import { veSignApi } from '../../api'

const PDFViewer = dynamic(() => import('../../components/general/PdfViewer'), {
  ssr: false,
})

const sendDocument = async (document) => {
  console.log('Entro a enviar el documento')

  const idDocument = document.idDocument
  const signedDocument = document.signedDocument
  const sign = document.sign
  var signedDate = new Date()
  signedDate =
    signedDate.getUTCFullYear() +
    '-' +
    ('00' + (signedDate.getUTCMonth() + 1)).slice(-2) +
    '-' +
    ('00' + signedDate.getUTCDate()).slice(-2) +
    ' ' +
    ('00' + signedDate.getUTCHours()).slice(-2) +
    ':' +
    ('00' + signedDate.getUTCMinutes()).slice(-2) +
    ':' +
    ('00' + signedDate.getUTCSeconds()).slice(-2)
  console.log(signedDate)

  try {
    const { data } = await veSignApi.patch(
      `/clientDocument/send/${idDocument}`,
      {
        sign,
        signedDocument,
        signedDate,
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
    <Layout>
      <div className={styles.containerDocument}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>¡Su documento ha sido firmado!</h1>
          <p className={styles.text}>
            Por favor lea el documento con cuidado. Si deseas enviarlo presione
            el boton de Enviar y si quiere volver a hacer la firma presione
            Regresar
          </p>
          {screenWidth.current > 767 && (
            <button className={style.accept} onClick={() => onClick(info)}>
              Enviar
            </button>
          )}
        </div>
        <PDFViewer file={document.signedDocument} screenWidth={screenWidth} />
        {screenWidth.current < 768 && (
          <button
            className={style.accept}
            onClick={() => sendDocument(document)}
          >
            Enviar
          </button>
        )}
        <Link href='/signDocument/sign' className={style.back}>
          Regresar
        </Link>
      </div>
    </Layout>
  )
}
