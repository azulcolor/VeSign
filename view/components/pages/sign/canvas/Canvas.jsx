import { useRef, useState } from 'react'

import Link from 'next/link'

import Component from './component'
import SignButton from './SignButton'
import styles from '../../../../styles/general/button.module.css'

export default function Canva() {
  const canvas = useRef('')
  const screenWidth = useRef(typeof window !== 'undefined' && window.innerWidth)

  const [isSigned, setIsSigned] = useState(false)

  return (
    <>
      <Component
        canvas={canvas}
        screenWidth={screenWidth}
        setIsSigned={setIsSigned}
      />
      <SignButton
        isSigned={isSigned}
        screenWidth={screenWidth}
        canvas={canvas}
      />
      <Link href='document' className={styles.back}>
        Regresar
      </Link>
    </>
  )
}
