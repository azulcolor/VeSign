import { veSignApi } from '../../../api'
import Information from '../../../components/admin/shipments/information/Information'
import { AdminLayout } from '../../../components/layouts'
import PdfViewer from '../../../components/general/document/pdfViewer'
import styles from '../../../styles/admin/shipments.module.css'

export default function Shipment({ client }) {
  return (
    <AdminLayout>
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

  
    const { data } = await veSignApi.get(`client/client/${id}`)
    const { client } = data

    return {
      props: {
        client,
      },
      revalidate: 1,
    }
}
