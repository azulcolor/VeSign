import Link from 'next/link'
import { useEffect } from 'react'

import styles from '../../styles/layouts/layout.module.css'
import Logo from '../general/Logo'

export default function Header() {
  useEffect(() => {
    document.body.setAttribute('data-theme', 'light')
  }, [])

  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.headerOptions}>
        <Link href={'/admin/shipments/send'}>Realizar Envío</Link>
        <Link href={'/admin/shipments'}>Envíos</Link>
        <Link href={'/admin/templates'}>Templates</Link>
        <Link href={'/admin/users'}>Usuarios</Link>
      </div>
    </header>
  )
}
