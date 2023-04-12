import dayjs from 'dayjs'
const formatDate = (date) => dayjs(date).format('DD/MM/YYYY')

export const useFilterClient = (
  client,
  status,
  document,
  date,
  contract,
  name
) => {
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

  return {
    filter,
  }
}

export const useFilterUser = (fullName, rol, user) => {
  let filter = user.data.users.filter((user) =>
    user.fullName.includes(fullName)
  )

  rol && (filter = filter.filter((user) => user.idRol === rol))

  return {
    filter,
  }
}

export const useOption = (options) => {
  let filterStatus = options.data.options.documentStatus
  let filterDocument = options.data.options.documentType

  return {
    filterStatus,
    filterDocument,
  }
}

export const useClient = (client) => {
  let filterName = client.data.clients.map((client) => client.fullname)
  filterName = [...new Set(filterName)]

  let filterContract = client.data.clients.map(
    (client) => client.contractNumber
  )
  filterContract = [...new Set(filterContract)]

  return {
    filterName,
    filterContract,
  }
}

export const useUser = (user) => {
  let filterName = user.data.users.map((user) => user.fullName)
  filterName = [...new Set(filterName)]
  let filterRol = user.data.users.map((user) => {
    return user.idRol === 1
      ? { id: 1, label: 'Socio' }
      : user.idRol === 2
      ? { id: 2, label: 'Sala' }
      : { id: 3, label: 'Administrador' }
  })

  filterRol = filterRol.filter((rol, index, self) => {
    return self.findIndex((t) => t.id === rol.id) === index
  })

  return {
    filterName,
    filterRol,
  }
}
