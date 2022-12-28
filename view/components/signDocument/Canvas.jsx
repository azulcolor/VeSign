import { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import DeleteIcon from '@mui/icons-material/Delete'

import { selectDocument } from '../../provider/signDocument/documentSlice'
import { veSignApi } from '../../api'
import styles from '../../styles/general/button.module.css'
import style from '../../styles/signDocument/canvas.module.css'
import {
  setSignedDocument,
  setSign,
} from '../../provider/signDocument/documentSlice'

export default function Canva() {
  const dispatch = useDispatch()
  const document = useSelector(selectDocument)

  const canvas = useRef(null)
  const screenWidth = useRef(typeof window !== 'undefined' && window.innerWidth)
  const [isSigned, setIsSigned] = useState(false)

  const sign = async () => {
    if (canvas.current.isEmpty()) {
      alert('Ingrese una firma antes de continuar')
      return
    }

    const signImage = await canvas.current
      .getTrimmedCanvas()
      .toDataURL('image/png')

    console.log(canvas.current.isEmpty())

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
      />
      <div className={style.restart}>
        <DeleteIcon
          onClick={() => canvas.current.clear()}
          className={style.button}
        />
      </div>
      {isSigned ? (
        <Link href='/signDocument/documentSigned'>
          <button onClick={() => sign()} className={styles.accept}>
            Firmar
          </button>
        </Link>
      ) : (
        <button onClick={() => sign()} className={styles.accept}>
          Firmar
        </button>
      )}
    </>
  )
}
