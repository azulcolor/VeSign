import { useState } from 'react'

import styles from '../../../../styles/auth/auth.module.css'
import { login } from '../../../../hooks/api/fetcher'

export default function Form() {
  const [user, setUser] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false)

  const input = (e, set) => {
    setError(false)
    set(e.target.value)
  }

  return (
    <>
      <form className={styles.form}>
        <input
          type='text'
          placeholder='Usuario'
          className={styles.input}
          onChange={(e) => input(e, setUser)}
        />
        <div>
          <input
            type='password'
            placeholder='Contraseña'
            className={styles.input2}
            onChange={(e) => input(e, setPassword)}
          />
        </div>

        {error && <p className={styles.error}>Contraseña o usuario inválido</p>}
        <button
          className={styles.button}
          onClick={(e) => login(user, password, e, setError)}
        >
          Iniciar sesión
        </button>
      </form>
    </>
  )
}
