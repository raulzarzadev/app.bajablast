import { Box } from '@mui/material'
import LoadingButton from './LoadingButton'
import { NewClient } from '@/types/user'
import CurrencySpan from './CurrencySpan'
import ModalAcceptTerms from './ModalAcceptTerms'
import { useContext } from 'react'
import { NewClientContext } from '@/context/new-client'
import asNumber from '@/utils/asNumber'

const FinishNewClient = ({
  handleFinish,
  clients
}: {
  clients: NewClient[]
  handleFinish?: () => void | Promise<void>
}) => {
  const reducerClientActivities = (acc: any, curr: any) =>
    asNumber(acc) + asNumber(curr.price)

  const { client, setClient } = useContext(NewClientContext)
  const total = clients?.reduce(
    (acc, client) => acc + (parseFloat(`${client?.activity?.price}`) || 0),
    0
  )
  const multiActivitiesTotal = clients?.reduce(
    (acc, client) =>
      acc +
      (parseFloat(
        `${client?.activities?.reduce(reducerClientActivities, 0)}`
      ) || 0),
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
              <td>
                {friend?.activity?.name ||
                  friend?.activities?.map((a) => (
                    <p key={a.name}>{a.name}, </p>
                  ))}
              </td>
              <td>
                {friend?.activity?.price ? (
                  <CurrencySpan quantity={friend?.activity?.price} />
                ) : (
                  <CurrencySpan
                    quantity={friend?.activities?.reduce(
                      reducerClientActivities,
                      0
                    )}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>Total:</td>
            <td>
              <CurrencySpan quantity={total || multiActivitiesTotal} />
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
