import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import DeleteIcon from '@mui/icons-material/Delete'

import { selectDocument } from '../../../provider/signDocument/documentSlice'
import { veSignApi } from '../../../api'
import styles from '../../../styles/general/button.module.css'
import style from '../../../styles/signDocument/canvas.module.css'
import {
  setSignedDocument,
  setSign,
} from '../../../provider/signDocument/documentSlice'

export default function Canva() {
  const dispatch = useDispatch()
  const document = useSelector(selectDocument)

  const canvas = useRef('')
  const screenWidth = useRef(typeof window !== 'undefined' && window.innerWidth)

  const [isSigned, setIsSigned] = useState(false)

  const clear = () => {
    canvas.current.clear()
    setIsSigned(false)
  }
  const sign = async () => {
    if (canvas.current.isEmpty()) {
      alert('Ingrese una firma antes de continuar')
      return
    }

    const signImage = await canvas.current
      .getTrimmedCanvas()
      .toDataURL('image/png')

    dispatch(setSign(signImage))

    const { data } = await veSignApi.patch('/clientDocument/sign', {
      sign: signImage,
      documentToSign: `data:application/pdf;base64,${document.unsignedDocument}`,
      screenWidth: screenWidth.current,
    })

    dispatch(setSignedDocument(data.documentSigned))
  }

  return (
    <>
      <SignatureCanvas
        ref={canvas}
        canvasProps={{
          className: 'signatureCanvas',
        }}
        maxWidth={screenWidth.current < 768 ? 0.9 : 1.2}
        minWidth={screenWidth.current < 768 ? 0.7 : 1}
        onBegin={() => setIsSigned(true)}
      />

      <div className={style.restart}>
        <DeleteIcon onClick={clear} className={style.button} />
      </div>

      {isSigned ? (
        <Link href='documentSigned'>
          <button
            onClick={sign}
            className={isSigned ? styles.accept : styles.off}
          >
            Firmar
          </button>
        </Link>
      ) : (
        <button
          onClick={sign}
          className={isSigned ? styles.accept : styles.off}
        >
          Firmar
        </button>
      )}

      <Link href='document' className={styles.back}>
        Regresar
      </Link>
    </>
  )
}
