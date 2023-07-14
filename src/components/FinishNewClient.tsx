import { Box } from '@mui/material'
import LoadingButton from './LoadingButton'
import { NewClient } from '@/types/user'
import CurrencySpan from './CurrencySpan'
import ModalAcceptTerms from './ModalAcceptTerms'
import { useContext } from 'react'
import { NewClientContext } from '@/context/new-client'

const FinishNewClient = ({
  handleFinish,
  clients
}: {
  clients: NewClient[]
  handleFinish?: () => void | Promise<void>
}) => {
  const { client, setClient } = useContext(NewClientContext)
  const total = clients?.reduce(
    (acc, client) => acc + (parseFloat(`${client?.activity?.price}`) || 0),
    0
  )

  console.log({ clients })
  console.log({ client })

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
              <td>
                <CurrencySpan quantity={friend?.activity?.price} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>Total:</td>
            <td>
              <CurrencySpan quantity={total} />
            </td>
          </tr>
        </tfoot>
      </table>
      <ModalAcceptTerms
        signature={client?.signature}
        setSignature={(signature): void => {
          const clientWithSignature: NewClient | undefined = client && {
            ...client,
            signature,
            termsAccepted: !!signature
          }

          setClient?.(clientWithSignature)
        }}
      />
      <div className="w-full justify-center my-8 flex">
        <LoadingButton
          disabled={!client?.signature}
          onClick={handleFinish}
          aria-label="Save"
          label="Registrar"
        />
      </div>
    </Box>
  )
}

export default FinishNewClient
