import { useEffect, useState } from 'react'

import styles from '../../../styles/layouts/layout.module.css'
import Logo from '../../general/Logo'
import Mode from '../../general/Mode'

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
      <Logo mode={mode} />
      <div className={styles.headerOptions}>
        <Mode mode={mode} setMode={setMode} />
      </div>
    </header>
  )
}
