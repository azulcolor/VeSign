import useSWR from 'swr'
import { useState } from 'react'

import { AdminLayout } from '../../../components/layouts'
import { fetcher } from '../../../hooks/api/fetcher'
import {
  useFilterClient,
  useClient,
  useOption,
} from '../../../hooks/components/admin/useFilter'
import Filters from '../../../components/pages/admin/shipments/Filters/Filters'
import ClientList from '../../../components/pages/admin/shipments/ClientList/ClientList'
import styles from '../../../styles/admin/shipments.module.css'
import authenticatedRoute from '../../../components/pages/auth/authenticatedRoute'

function Shipments() {
  const [name, setName] = useState('')
  const [status, setStatus] = useState()
  const [document, setDocument] = useState()
  const [contract, setContract] = useState('')
  const [date, setDate] = useState()
  const API = process.env.NEXT_PUBLIC_API_ROUTE

  let client = useSWR(`${API}/client`, url =>
    fetcher(url, date)
  )

  const options = useSWR(`${API}/client/options`, fetcher)

  if (client.error || options.error) return <div>failed to load</div>
  if (client.isLoading || options.isLoading) return <div>loading...</div>

  let { filterName, filterContract } = useClient(client)

  let { filterStatus, filterDocument } = useOption(options)

  let { filter } = useFilterClient(
    client,
    status,
    document,
    date,
    contract,
    name
  )

  return (
    <AdminLayout>
      <div className={styles.column}>
        <Filters
          filters={{
            filterName,
            filterStatus,
            filterDocument,
            filterContract,
            date,
          }}
          setFilters={{ setName, setStatus, setDocument, setDate, setContract }}
        />
        <ClientList clients={filter} />
      </div>
    </AdminLayout>
  )
}

export default authenticatedRoute(Shipments, { pathAterFailure: '/auth/login' })
