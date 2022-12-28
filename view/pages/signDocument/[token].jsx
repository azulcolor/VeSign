import { useDispatch } from 'react-redux'

import { veSignApi } from '../../api'
import Button from '../../components/general/Button'
import Layout from '../../components/signDocument/Layout.jsx'
import { setUnsignedDocument } from '../../provider/signDocument/documentSlice'
import styles from '../../styles/signDocument/text.module.css'

export default function SignDocument({ client }) {
  const dispatch = useDispatch()

  dispatch(setUnsignedDocument(client.document))

  return (
    <div>
      <Layout>
        <div className={styles.container}>
          <h1 className={styles.title}>Aviso de privacidad</h1>
          <p className={styles.text}>
            Por el presente acepto que mis datos sean usados al momento de
            firmar el documento que se le mostrará y sea almacenado un total de
            3 días
          </p>
          <Button link={'document'}>Acepto</Button>
        </div>
      </Layout>
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
