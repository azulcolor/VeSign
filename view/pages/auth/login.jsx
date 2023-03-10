import Form from '../../components/pages/auth/login/Form'
import Logo from '../../components/pages/auth/login/Logo'
import styles from '../../styles/auth/auth.module.css'

export default function Login() {
  return (
    <div className={styles.logo}>
      <Logo />
      <Form />
    </div>
  )
}
