import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { SignLayout } from '../../../components/layouts/index'
import styles from '../../../styles/sign/text.module.css'

export default function Success() {
  const [count, setCount] = useState(3)
  const router = useRouter()

  useEffect(() => {
    const interval =
      count &&
      setInterval(() => {
        setCount((count) => count - 1)
      }, 1000)

    count == 0 && router.push('/admin/shipments/6')

    return () => {
      clearInterval(interval)
    }
  }, [count, router])

  return (
    <div>
      <SignLayout>
        <div className={styles.container}>
          <h1 className={styles.title}>
            ¡El documento ha sido enviado con éxito!
          </h1>
          <p className={styles.text}>
           será redirigido en {count} segundos 
          </p>
        </div>
      </SignLayout>
    </div>
  )
}
