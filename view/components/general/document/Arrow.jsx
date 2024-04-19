import ArrowBackIosSharp from '@mui/icons-material/ArrowBackIosSharp'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import styles from '../../../styles/general/documentControl.module.css'

export default function Arrow({ onClick, page, condition, direction }) {
  return (
    <>
      <div style={{ width: '40px' }}>
        {page === condition ? (
          <></>
        ) : (
          <button onClick={onClick}>
            {direction === 'left' ? (
              <ArrowBackIosSharp className={styles.arrow} />
            ) : (
              <ArrowForwardIosIcon className={styles.arrow} />
            )}
          </button>
        )}
      </div>
    </>
  )
}
