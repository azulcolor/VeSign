import useSWR from 'swr'
import { useState } from 'react'

import { AdminLayout } from '../../../components/layouts'
import { fetcher } from '../../../hooks/api/fetcher'
import Filters from '../../../components/admin/shipments/filters/Filters'
import ClientList from '../../../components/admin/shipments/clientList/ClientList'
import styles from '../../../styles/admin/shipments.module.css'
import dayjs from 'dayjs'

const formatDate = (date) => dayjs(date).format('DD/MM/YYYY')

export default function Shipments() {
  const [name, setName] = useState('')
  const [status, setStatus] = useState()
  const [document, setDocument] = useState()
  const [contract, setContract] = useState('')
  const [date, setDate] = useState()

  let client = useSWR('http://localhost:3000/api/client', (url) =>
    fetcher(url, date)
  )

  const options = useSWR('http://localhost:3000/api/client/options', fetcher)

  if (client.error || options.error) return <div>failed to load</div>
  if (client.isLoading || options.isLoading) return <div>loading...</div>

  let filterName = client.data.clients.map((client) => client.fullname)
  let filterContract = client.data.clients.map(
    (client) => client.contractNumber
  )
  let filterStatus = options.data.options.documentStatus
  let filterDocument = options.data.options.documentType

  filterName = [...new Set(filterName)]
  filterContract = [...new Set(filterContract)]

  let filter = client.data.clients.filter((client) =>
    client.fullname.includes(name)
  )

  status && (filter = filter.filter((client) => client.idStatus === status))

  document && (filter = filter.filter((client) => client.idType === document))

  date &&
    (filter = filter.filter(
      (client) => formatDate(client.creationDate) === formatDate(date)
    ))

  contract &&
    (filter = filter.filter((client) => client.contractNumber === contract))

  return (
    <AdminLayout>
      <div className={styles.column}>
        <Filters
          name={filterName}
          setName={setName}
          status={filterStatus}
          setStatus={setStatus}
          document={filterDocument}
          setDocument={setDocument}
          setDate={setDate}
          date={date}
          contract={filterContract}
          setContract={setContract}
        />
        <ClientList clients={filter} />
      </div>
    </AdminLayout>
  )
}
