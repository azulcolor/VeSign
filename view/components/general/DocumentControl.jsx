import ArrowBackIosSharp from '@mui/icons-material/ArrowBackIosSharp'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import styles from '../../styles/general/documentControl.module.css'

const next = (setPage) => {
  setPage((page) => page + 1)
}

const prev = (setPage) => {
  setPage((page) => page - 1)
}

export default function DocumentControl({ numPages, page, setPage }) {
  return (
    <div className={styles.container}>
      <div style={{ width: '40px' }}>
        {page === 1 ? (
          <></>
        ) : (
          <button onClick={() => prev(setPage)}>
            <ArrowBackIosSharp className={styles.arrow} />
          </button>
        )}
      </div>

      <div style={{ width: '40px' }}>
        {page === numPages ? (
          <></>
        ) : (
          <button onClick={() => next(setPage)}>
            <ArrowForwardIosIcon className={styles.arrow} />
          </button>
        )}
      </div>
    </div>
  )
}
