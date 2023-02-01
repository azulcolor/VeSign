import { useState } from 'react'

export const useFilter = async (client, options) => {
  const [name, setName] = useState()
  const [status, setStatus] = useState()
  const [document, setDocument] = useState()

  let filterName = client.data.clients.map((client) => client.fullname)
  let filterStatus = options.data.options.documentStatus
  let filterDocument = options.data.options.documentType

  filterName = [...new Set(filterName)]

  let filter = client.data.clients.filter((client) =>
    client.fullname.includes(name)
  )

  status
    ? (filter = filter.filter((client) => client.idStatus === status))
    : null

  document
    ? (filter = filter.filter((client) => client.idType === document))
    : null

  return {
    filter,
    filterName,
    setName,
    filterStatus,
    setStatus,
    filterDocument,
    setDocument,
  }
}
