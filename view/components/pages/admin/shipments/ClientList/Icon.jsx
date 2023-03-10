import EmailIcon from '@mui/icons-material/Email'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import RemoveIcon from '@mui/icons-material/Remove'

export default function Icon({ status }) {
  if (status === 1) return <EmailIcon />
  if (status === 2) return <EditIcon />
  if (status === 3) return <CheckIcon />
  if (status === 4) return <ClearIcon />
  if (status === 5) return <RemoveIcon />
}
