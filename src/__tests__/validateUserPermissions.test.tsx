import { validateUser } from '@/HOCs/withAuth'
import { describe, expect, it, test } from 'vitest'

describe('Validate User permissions', () => {
  // Tests that the function returns true if user is admin and isAdmin is included in permissions

  it('no validation is required', () => {
    const empty = validateUser('CLIENT', [])
    const undef = validateUser('CLIENT')
    const admin = validateUser('ADMIN')
    const admin2 = validateUser('CLIENT', [], { admin: true })
    expect(empty).toBe(true)
    expect(undef).toBe(true)
    expect(admin).toBe(true)
    expect(admin2).toBe(true)
  })

  it('reject if user is client and need to be collaborator', () => {
    const result = validateUser('CLIENT', ['COLLABORATOR'])
    expect(result).toBe(false)
  })

  it('reject if user is collaborator and need to be coordinator', () => {
    const result = validateUser('COLLABORATOR', ['COORDINATOR'])
    expect(result).toBe(false)
  })
  it('reject if user is coordinator and need to be admin', () => {
    const result = validateUser('COORDINATOR', ['ADMIN'])
    const result2 = validateUser('CLIENT', ['ADMIN'])
    expect(result).toBe(false)
    expect(result2).toBe(false)
  })

  it('validate all if user is ADMIN', () => {
    const all = validateUser('ADMIN', [])
    const asClient = validateUser('ADMIN', ['CLIENT'])
    const asCollaborator = validateUser('ADMIN', ['COLLABORATOR'])
    const asCoordinator = validateUser('ADMIN', ['COORDINATOR'])
    expect(all).toBe(true)
    expect(asClient).toBe(true)
    expect(asCollaborator).toBe(true)
    expect(asCoordinator).toBe(true)
  })
  it('validate all if permissions is empty/undefined', () => {
    const empty = validateUser('CLIENT', [])
    const undef = validateUser('CLIENT')

    expect(empty).toBe(true)
    expect(undef).toBe(true)
  })
  it('validate all if user is ADMIN', () => {
    const asClient = validateUser('ADMIN', ['CLIENT'])
    const asCollaborator = validateUser('ADMIN', ['COLLABORATOR'])
    const asCoordinator = validateUser('ADMIN', ['COORDINATOR'])
    const asAdmin = validateUser('ADMIN', ['ADMIN'])

    expect(asClient).toBe(true)
    expect(asCollaborator).toBe(true)
    expect(asCoordinator).toBe(true)
    expect(asAdmin).toBe(true)
  })
  it('if permissions contain COLLABORATOR, users with admin, coordinator y collaborator should be', () => {
    const client = validateUser('CLIENT', ['COLLABORATOR'])
    const collaborator = validateUser('COLLABORATOR', ['COLLABORATOR'])
    const coordinator = validateUser('COORDINATOR', ['COLLABORATOR'])
    const admin = validateUser('ADMIN', ['COLLABORATOR'])
    expect(client).toBe(false)
    expect(collaborator).toBe(true)
    expect(coordinator).toBe(true)
    expect(admin).toBe(true)
  })
})
