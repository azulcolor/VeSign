import { useDispatch } from 'react-redux'

import { veSignApi } from '../../api'
import Button from '../../components/general/Button'
import { SignLayout } from '../../components/layouts/index'
import {
  setIdDocument,
  setUnsignedDocument,
} from '../../provider/sign/documentSlice'
import styles from '../../styles/sign/text.module.css'

export default function sign({ client }) {
  const dispatch = useDispatch()

  dispatch(setUnsignedDocument(client.document))
  dispatch(setIdDocument(client.idDocument))

  return (
    <div>
      <SignLayout>
        <div className={styles.container}>
          <h1 className={styles.title}>Aviso de privacidad</h1>
          <p className={styles.text}>
            Por el presente acepto que mis datos sean usados al momento de
            firmar el documento que se le mostrará y sea almacenado un total de
            3 días
          </p>
          <Button link={'document'}>Acepto</Button>
        </div>
      </SignLayout>
    </div>
  )
}

export const getStaticPaths = async (ctx) => {
  const { data } = await veSignApi.get('clientDocument/tokens')

  return {
    paths: data.map(({ token }) => ({
      params: { token },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }) => {
  const { token = '' } = params

  const { data } = await veSignApi.get(`/clientDocument/info/${token}`)
  const { client } = data

  return {
    props: {
      client,
    },
    revalidate: 60,
  }
}