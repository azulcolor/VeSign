import { veSignApi } from '../../../api'
import Information from '../../../components/pages/admin/shipments/information/Information'
import { AdminLayout } from '../../../components/layouts'
import PdfViewer from '../../../components/general/document/PdfViewer'
import styles from '../../../styles/admin/shipments.module.css'
import authenticatedRoute from '../../../components/pages/auth/authenticatedRoute'

function Shipment({ client }) {
  return (
    <AdminLayout>
      <div className={styles.row}>
        <Information client={client} />
        <PdfViewer file={client.document} />
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps = async ({ params }) => {
  let { id } = params
  id = parseInt(id)

  const { data } = await veSignApi.get(`client/client/${id}`)
  const { client } = data

  return {
    props: {
      client,
    },
  }
}

export default authenticatedRoute(Shipment, { pathAterFailure: '/auth/login' })
