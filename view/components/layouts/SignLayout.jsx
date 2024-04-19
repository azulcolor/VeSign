import Head from 'next/head'

import styles from '../../styles/layouts/layout.module.css'
import Header from '../pages/sign/Header'

export function SignLayout({ children }) {
  return (
    <>
      <Head>
        <title>Sign Document</title>
        <meta name='description' content='Sign Document' />
      </Head>

      <div className={styles.screenContainer}>
        <Header />
        {children}
      </div>
    </>
  )
}
