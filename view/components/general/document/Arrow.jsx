import ArrowBackIosSharp from '@mui/icons-material/ArrowBackIosSharp'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import styles from '../../../styles/general/documentControl.module.css'

export default function Arrow(props) {
  return (
    <>
      <div style={{ width: '40px' }}>
        {props.page === props.condition ? (
          <></>
        ) : (
          <button onClick={props.onClick}>
            {props.direction === 'left' ? (
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
