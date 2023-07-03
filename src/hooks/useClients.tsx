import { ClientsContext } from '@/context/clients'
import { useContext } from 'react'

const useClients = () => {
  const { clients } = useContext(ClientsContext)
  return { clients }
}

export default useClients
