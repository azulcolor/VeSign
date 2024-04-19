import axios from 'axios'
import Cookies from 'js-cookie'

import { veSignApi } from '../../api'

const token = Cookies.get('token')

const headers = {
  headers: {
    'x-token': token,
  },
}

console.log(token)

export const fetcher = (url, date = '') =>
  axios
    .get(url, {
      params: { date },
      headers: {
        'x-token': token,
      },
    })
    .then(res => res.data)

export const sendDocument = async (formData, setError) => {
  try {
    const res = await veSignApi.post(`/sendDocument`, formData, headers)
    console.log(res)
    const { id } = res.data

    window.location.href = `/admin/shipments/send/${id}`
  } catch (error) {
    const err = error.response.data.errors

    err &&
      Object.entries(err).forEach(([key, value]) => {
        setError(prev => [...prev, value.msg])
      })

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

    Cookies.set('token', res.data.token, { expires: 1 })

    window.location.href = '/admin/shipments'
  } catch (error) {
    setError(true)
  }
}

export const createUser = async (userData, setError) => {
  try {
    await veSignApi.post(`/auth/user`, userData, headers)

    window.location.href = `/admin/users`
  } catch (error) {
    const err = error.response.data.errors

    err &&
      Object.entries(err).forEach(([key, value]) => {
        setError(prev => [...prev, value.msg])
      })

    setTimeout(() => {
      setError([])
    }, 4000)
  }
}

export const createTemplate = async (templateData, setError) => {
  try {
    await veSignApi.post(`/template`, templateData, headers)

    window.location.href = `/admin/templates`
  } catch (error) {
    const err = error.response.data.errors

    err &&
      Object.entries(err).forEach(([key, value]) => {
        setError(prev => [...prev, value.msg])
      })

    setTimeout(() => {
      setError([])
    }, 4000)
  }
}

export const updateUser = async (information, id) => {
  await veSignApi.patch(`/auth/user/${id}`, information, headers)
}

export const updateTemplate = async (information, id) => {
  await veSignApi.patch(`/template/${id}`, information, headers)
}

export const deleteUser = async id => {
  await veSignApi.delete(`/auth/user/${id}`, headers)
}

export const desactivateTemplate = async id => {
  await veSignApi.patch(`/template/desactivate/${id}`, null, headers)
}
