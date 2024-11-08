import Image from 'next/image'

import { useState, useEffect } from 'react'

import styles from '../../styles/layouts/layout.module.css'
import darkLogo from '../../public/images/logo/darkLogo.png'
import lightLogo from '../../public/images/logo/lightLogo.png'
import Link from 'next/link'

export default function Logo({ mode = false }) {
  const [windowWidth, setWindowWidth] = useState()

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  })

  return (
    <Link href={'/admin/shipments'}>
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
    </Link>
  )
}
