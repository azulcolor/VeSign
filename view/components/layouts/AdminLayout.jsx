import { useRouter } from 'next/router'
import Head from 'next/head'

import useAuth from '../../hooks/components/auth/useAuth'
import styles from '../../styles/layouts/layout.module.css'
import Header from '../pages/admin/Header'

export function AdminLayout({ children }) {
  // const { isLogged } = useAuth()
  // console.log(isLogged())

  // if (!isLogged()) {
  //   console.log(isLogged)
  //   const router = useRouter()
  //   // router.push('/auth/login')
  // } else {
    return (
      <>
        <Head>
          <title>Dashboard</title>
          <meta name='description' content='Clients information' />
        </Head>

        <div className={styles.screenContainer}>
          <Header />
          <div className={styles.children}>{children}</div>
        </div>
      </>
    )
  }
// }
