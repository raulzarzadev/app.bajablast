import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'

// https://mui.com/material-ui/material-icons/

const icons = {
  add: <AddIcon />,
  edit: <EditIcon />,
  close: <CloseIcon />,
  money: <AttachMoneyIcon />,
  save: <SaveIcon />,
  print: <PrintIcon />
} as const
export type IconName = keyof typeof icons
const AppIcon = ({ icon }: { icon: IconName }) => {
  return icons[icon]
}

export default AppIcon
