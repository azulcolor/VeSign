import Cookies from 'js-cookie'
import { veSignApi } from '../../../api'

const useAuth = () => {
  const handleLogout = () => {
    Cookies.remove('token')
    window.location.href = '/auth/login'
  }

  const isLogged = async () => {
    const token = Cookies.get('token')
    try {
      const { data } = await veSignApi.get('auth/logged', {
        headers: {
          'x-token': token,
        },
      })
      console.log( data )
      const { ok } = data
      if (!ok) {
        return false
      }
      return true
    } catch (error) {
      return false
    }
  }

  return {
    handleLogout,
    isLogged,
  }
}

export default useAuth
