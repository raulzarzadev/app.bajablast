'use client'
import CollaboratorsList from '@/components/CollaboratorsList'
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
