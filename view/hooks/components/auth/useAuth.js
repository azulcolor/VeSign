import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const useAuth = () => {
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove('token')
    window.location.href = '/auth/login'
  }
  
  const isLogged = () => {
    const token = Cookies.get('token')
    if (!token) {
      return false
    }
    return true
  }

  return {
    handleLogout,
    isLogged
  }
}

export default useAuth
