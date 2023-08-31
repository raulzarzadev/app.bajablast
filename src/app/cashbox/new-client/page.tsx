'use client'

import withAuth from '@/HOCs/withAuth'
import StepperNewClientContext from '@/components/StepperNewClient'

const page = () => {
  return (
    <>
      <StepperNewClientContext />
    </>
  )
}

export default withAuth(page, ['COLLABORATOR'])
