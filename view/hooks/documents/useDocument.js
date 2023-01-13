import { useState } from 'react'

export const useDocument = () => {
  const [numPages, setNumPages] = useState(null)
  const [page, setPage] = useState(1)

  const next = () => setPage((page) => page + 1)
  const prev = () => setPage((page) => page - 1)

  return {
    page,
    numPages,
    setNumPages,
    next,
    prev,
  }
}
