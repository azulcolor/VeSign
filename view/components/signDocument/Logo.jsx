import Image from 'next/image'
import { useState, useEffect } from 'react'

import styles from '../../styles/signDocument/layout.module.css'
import darkLogo from '../../public/darkLogo.png'
import lightLogo from '../../public/lightLogo.png'

export default function Logo({ mode }) {
  const [windowWidth, setWindowWidth] = useState()

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  })

  return (
    <div className={styles.logo}>
      {windowWidth > 767 && (
        <Image src={mode ? darkLogo : lightLogo} alt='logo' width={64} />
      )}
      <ul className={styles.title}>
        <li className={styles.veSign}>Vesign</li>
        <li className={styles.separation}>|</li>
        <li className={styles.capital}>Capital</li>
      </ul>
    </div>
  )
}
