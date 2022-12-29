import Arrow from './Arrow'
import styles from '../../../styles/general/documentControl.module.css'

const next = (setPage) => {
  setPage((page) => page + 1)
}

const prev = (setPage) => {
  setPage((page) => page - 1)
}

export default function Controller({ numPages, page, setPage }) {
  return (
    <div className={styles.container}>
      <Arrow
        page={page}
        condition={1}
        onClick={() => prev(setPage)}
        direction='left'
      />

      <Arrow
        page={page}
        condition={numPages}
        onClick={() => next(setPage)}
        direction='right'
      />
    </div>
  )
}
