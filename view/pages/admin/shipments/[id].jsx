import { veSignApi } from '../../../api'
import Information from '../../../components/admin/shipments/information/Information'
import { AdminLayout } from '../../../components/layouts'
import PdfViewer from '../../../components/general/document/pdfViewer'
import styles from '../../../styles/admin/shipments.module.css'
import zIndex from '@mui/material/styles/zIndex'

export default function Shipment({ client }) {
  console.log(client)

  return (
    <AdminLayout>
      <div
        style={{
          width: '50%',
          height: '50%',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          border: '1px solid black',
          zIndex: 1000
        }}
      ></div>
      <div className={styles.row}>
        <Information client={client} />
        <PdfViewer file={client.document} />
      </div>
    </AdminLayout>
  )
}
export const getStaticPaths = async () => {
  const { data } = await veSignApi.get('client/idClient')

  return {
    paths: data.map(({ idDocument }) => ({
      params: { id: idDocument.toString() },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }) => {
  let { id } = params
  id = parseInt(id)

  try {
    const { data } = await veSignApi.get(`client/client/${id}`)
    const { client } = data

    return {
      props: {
        client,
      },
      revalidate: 1,
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}
