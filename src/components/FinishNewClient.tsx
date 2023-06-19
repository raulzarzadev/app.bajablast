import { NewClientContext } from '@/context/new-client'
import { Box } from '@mui/material'
import { useContext } from 'react'
import LoadingButton from './LoadingButton'
import { NewClient } from '@/types/user'

const FinishNewClient = ({
  handleFinish,
  clients
}: {
  clients: NewClient[]
  handleFinish?: () => void | Promise<void>
}) => {
  const total = clients?.reduce(
    (acc, client) => acc + (client?.activity?.price || 0),
    0
  )

  return (
    <Box component={'section'}>
      <table className="w-full text-center">
        <tbody>
          <tr>
            <th>Cliente</th>
            <th>Actividad</th>
            <th>Cantidad</th>
          </tr>

          {clients?.map((friend, i) => (
            <tr key={(friend?.id || '') + i}>
              <td>{friend?.name}</td>
              <td>{friend?.activity?.name}</td>
              <td>{friend?.activity?.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>Total:</td>
            <td>${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <div className="w-full justify-center my-8 flex">
        <LoadingButton
          onClick={handleFinish}
          aria-label="Save"
          label="Registrar"
        />
      </div>
    </Box>
  )
}

export default FinishNewClient
