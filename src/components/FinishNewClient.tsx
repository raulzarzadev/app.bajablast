import { NewClientContext } from '@/context/new-client'
import { Box } from '@mui/material'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

const FinishNewClient = () => {
  const { client, friends } = useContext(NewClientContext)
  console.log({ client, friends })
  const total =
    client?.activity?.price +
    friends?.reduce((acc, friend) => acc + friend?.activity?.price, 0)
  return (
    <Box component={'section'}>
      <table className="w-full text-center">
        <tbody>
          <tr>
            <th>Cliente</th>
            <th>Actividad</th>
            <th>Cantidad</th>
          </tr>
          <tr>
            <td>{client?.name}</td>
            <td>{client?.activity?.activityId}</td>
            <td>{client?.activity?.price}</td>
          </tr>
          {friends?.map((friend) => (
            <tr key={friend.id}>
              <td>{friend?.name}</td>
              <td>{friend?.activity?.activityId}</td>
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
    </Box>
  )
}

export default FinishNewClient
