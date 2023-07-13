import { ParkContext } from '@/context/park'
import { useContext } from 'react'

export default function useParkConfig() {
  const parkConfig = useContext(ParkContext)
  return { parkConfig: parkConfig.configuration }
}
