'use client'
import CollaboratorsList from '@/components/CollaboratorsTable'
import useCollaborators from '@/hooks/useCollaborators'

const Page = () => {
  const { collaborators } = useCollaborators()
  console.log({ collaborators })
  return (
    <div>
      <CollaboratorsList collaborators={collaborators} />
    </div>
  )
}

export default Page
