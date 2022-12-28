import Link from 'next/link'

import styles from '../../styles/general/button.module.css'

export default function Button({ children, link }) {
  return (
    <Link href={`/signDocument/${link}`}>
      <button className={styles.accept}>{children}</button>
    </Link>
  )
}
