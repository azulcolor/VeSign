import Head from 'next/head'
import styles from '../../styles/signDocument/layout.module.css'
import Header from './Header'

export default function Layout({ children }) {
  
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
