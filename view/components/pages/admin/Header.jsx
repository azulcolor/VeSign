import Link from 'next/link'
import { useEffect } from 'react'

import  useAuth  from '../../../hooks/components/auth/useAuth'
import styles from '../../../styles/layouts/layout.module.css'
import Logo from '../../general/Logo'

export default function Header() {
  const logout = useAuth().handleLogout
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
        <button className={styles.logout} onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}
