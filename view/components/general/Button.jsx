import Link from 'next/link'

import styles from '../../styles/general/button.module.css'

export default function Button({ children, link, onClick }) {
  return onClick === undefined ? (
    <Link href={`${link}`}>
      <button className={styles.accept}>{children}</button>
    </Link>
  ) : (
    <Link href={`${link}`}>
      <button className={styles.accept} onClick={onClick}>
        {children}
      </button>
    </Link>
  )
}
