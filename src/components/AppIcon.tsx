import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
const icons = {
  add: <AddIcon />,
  edit: <EditIcon />,
  close: <CloseIcon />,
  money: <AttachMoneyIcon />
} as const
type IconName = keyof typeof icons
const AppIcon = ({ icon }: { icon: IconName }) => {
  return icons[icon]
}

export default AppIcon
