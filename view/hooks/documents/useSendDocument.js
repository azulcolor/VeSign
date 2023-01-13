import { setSigned } from '../../provider/sign/documentSlice'
import { veSignApi } from '../../api'

export const useSendDocument = async (dispatch, document) => {
  const idDocument = document.idDocument
  const signedDocument = document.signedDocument
  const sign = document.sign

  try {
    await veSignApi.patch(`/clientDocument/send/${idDocument}`, {
      sign,
      signedDocument,
    })

    dispatch(setSigned(true))
  } catch (error) {
    console.log('error', error)
  }
}
