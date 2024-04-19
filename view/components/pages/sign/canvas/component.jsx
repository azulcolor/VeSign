import SignatureCanvas from 'react-signature-canvas'
import DeleteIcon from '@mui/icons-material/Delete'

import style from '../../../../styles/sign/canvas.module.css'

export default function Component({ canvas, screenWidth, setIsSigned }) {
  const clear = () => {
    canvas.current.clear()

    setIsSigned(false)
  }
  return (
    <>
      <SignatureCanvas
        ref={canvas}
        canvasProps={{
          className: 'signatureCanvas',
        }}
        maxWidth={screenWidth.current < 830 ? 0.9 : 1.2}
        minWidth={screenWidth.current < 830 ? 0.7 : 1}
        onBegin={() => setIsSigned(true)}
      />

      <div className={style.restart}>
        <DeleteIcon onClick={clear} className={style.button} />
      </div>
    </>
  )
}
