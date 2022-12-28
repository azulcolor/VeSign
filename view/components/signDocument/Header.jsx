import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../../styles/signDocument/layout.module.css'
import Logo from './Logo'
import Mode from '../general/Mode'

export default function Header() {
  const [mode, setMode] = useState(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
      ? true
      : false
  )

  useEffect(() => {
    document.body.setAttribute('data-theme', mode ? 'dark' : 'light')
  }, [mode])

  return (
    <header className={styles.header}>
      <Logo mode={mode}/>
      <div className={styles.headerOptions}>
        {/* <ul>
          <li>
            <Link href='#'>Contacto</Link>
          </li>
          <li>
            <Link href='#'>Acerca de</Link>
          </li>
        </ul> */}
        <Mode mode={mode} setMode={setMode}/>
      </div>
    </header>
  )
}
