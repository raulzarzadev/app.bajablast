import CoordinatorOptions from '@/components/CoordinatorOptions'
import { render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

describe('Coordinator options section', () => {
  beforeEach(() => {
    render(<CoordinatorOptions />)
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  test('Show collaborators section', () => {
    const collaboratorsSection = within(
      screen.getByLabelText('collaborators-section')
    )
    expect(collaboratorsSection).toBeDefined()
  })
  test('Show activities section ', () => {
    const activitiesSection = within(
      screen.getByLabelText('activities-section')
    )
    expect(activitiesSection).toBeDefined()
  })

  test('Show clients section  ', () => {
    const datesList = screen.getAllByLabelText('show-clients-section')
    datesList.forEach((date) => {
      expect(date).toBeDefined()
    })
  })
  test('Show stats section  ', () => {
    const datesList = screen.getAllByLabelText('show-stats-section')
    datesList.forEach((date) => {
      expect(date).toBeDefined()
    })
  })
})
