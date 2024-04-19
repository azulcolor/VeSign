import authenticatedRouteLogin from '../../components/pages/auth/authenticatedRoute/loginPage'
import Form from '../../components/pages/auth/login/Form'
import Logo from '../../components/pages/auth/login/Logo'
import styles from '../../styles/auth/auth.module.css'

function Login() {
  return (
    <div className={styles.logo}>
      <Logo />
      <Form />
    </div>
  )
}

export default authenticatedRouteLogin(Login, {
  path: '/admin/shipments',
})
