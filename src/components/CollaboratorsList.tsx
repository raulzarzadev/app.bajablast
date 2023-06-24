import { UserType } from '@/types/user'
import DataTable from './DataTable'

const CollaboratorsList = ({
  collaborators
}: {
  collaborators: UserType[]
}) => {
  return (
    <div>
      <DataTable />
    </div>
  )
}

export default CollaboratorsList
