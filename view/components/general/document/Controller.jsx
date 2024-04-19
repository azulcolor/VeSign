import Arrow from './Arrow'
import styles from '../../../styles/general/documentControl.module.css'

export default function Controller({ numPages, page, next, prev }) {
  return (
    <div className={styles.container}>
      <Arrow page={page} condition={1} onClick={prev} direction='left' />

      <Arrow
        page={page}
        condition={numPages}
        onClick={next}
        direction='right'
      />
    </div>
  )
}
