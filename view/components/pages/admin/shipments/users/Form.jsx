import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close'

import Button from '../../../../general/Button'
import styles from '../../../../../styles/admin/shipments.module.css'

export default function Form({
  open,
  setOpen,
  setEdit,
  edit,
  updateById,
  id,
  children,
}) {
  const handleClose = () => {
    setOpen(false)
  }

  const editData = async () => {
    if (!edit) {
      alert('No hay nada que editar')
      return
    }

    await updateById(edit, id)
    handleClose()
    setEdit(null)
    window.location.reload()
  }

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '50%',
            height: '64%',
            overflow: 'auto',
          }}
        >
          <CloseIcon onClick={handleClose} className={styles.close} />
          <p className={styles.editMessage}>
            Edita solamente los campos que quieres cambiar
          </p>
          {children}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={editData}>Actualizar</Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}
