import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

const icons = {
  add: <AddIcon />,
  edit: <EditIcon />
} as const
type IconName = keyof typeof icons
const AppIcon = ({ icon }: { icon: IconName }) => {
  return icons[icon]
}

export default AppIcon
