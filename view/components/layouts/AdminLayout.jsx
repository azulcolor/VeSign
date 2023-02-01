import Head from 'next/head'

import styles from '../../styles/layouts/layout.module.css'
import Header from '../admin/Header'

export function AdminLayout({ children }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name='description' content='Clients information' />
      </Head>

      <div className={styles.screenContainer}>
        <Header />
        {children}
      </div>
    </>
  )
}
