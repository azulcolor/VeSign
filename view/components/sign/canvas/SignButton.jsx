import Link from 'next/link'

import { setSignedDocument, setSign } from '../../../provider/sign/documentSlice'
import { veSignApi } from '../../../api'
import styles from '../../../styles/general/button.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectDocument } from '../../../provider/sign/documentSlice'

export default function SignButton({ isSigned, screenWidth, canvas }) {
  const dispatch = useDispatch()
  const document = useSelector(selectDocument)

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
    </>
  )
}
