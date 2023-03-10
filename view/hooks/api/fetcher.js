import axios from 'axios'
import Cookies from 'js-cookie'

import { veSignApi } from '../../api'

const token = Cookies.get('token')

export const fetcher = (url, date = '') =>
  axios
    .get(url, {
      params: { date },
      headers: {
        'x-token': token,
      },
    })
    .then((res) => res.data)

export const sendDocument = async (
  fullName,
  contractNumber,
  email,
  phoneNumber,
  idAreaCode,
  idTemplate,
  idIdiom,
  setError
) => {
  try {
    const res = await veSignApi.post(
      `/sendDocument`,
      {
        fullName,
        contractNumber,
        email,
        phoneNumber,
        idAreaCode,
        idUser: 1,
        idTemplate,
        idIdiom,
      },
      {
        headers: {
          'x-token': token,
        },
      }
    )
    const { id } = res.data
    window.location.href = `/admin/shipments/send/${id}`
  } catch (error) {
    const err = error.response.data.errors

    err &&
      Object.entries(err).forEach(([key, value]) => {
        setError((prev) => [...prev, value.msg])
      })

    // delete error after 5 seconds

    setTimeout(() => {
      setError([])
    }, 4000)
  }
}

export const login = async (userName, userPassword, e, setError) => {
  e.preventDefault()
  try {
    const res = await veSignApi.post('/auth', {
      userName,
      userPassword,
    })
    console.log(res)

    Cookies.set('token', res.data.token, { expires: 1 })

    window.location.href = '/admin/shipments'
  } catch (error) {
    setError(true)
    console.log(error.response.data)
  }
}
