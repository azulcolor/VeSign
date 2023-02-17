import useSWR from 'swr'
import { useState } from 'react'

import { AdminLayout } from '../../../components/layouts'
import { fetcher } from '../../../hooks/api/fetcher'
import {useFilter, useClient, useOption} from '../../../hooks/components/admin/useFilter'
import Filters from '../../../components/admin/shipments/filters/Filters'
import ClientList from '../../../components/admin/shipments/clientList/ClientList'
import styles from '../../../styles/admin/shipments.module.css'

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

  let { filterName, filterContract } = useClient(client)

  let { filterStatus, filterDocument } = useOption(options)

  let { filter } = useFilter(client, status, document, date, contract, name)

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


