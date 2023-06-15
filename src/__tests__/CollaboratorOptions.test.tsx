import ClientOptions from '@/components/ClientOptions'
import CollaboratorOptions from '@/components/CollaboratorOptions'
import { render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

describe('Client optios section', () => {
  beforeEach(() => {
    render(<CollaboratorOptions />)
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  test('Show collaborator section', () => {
    const clientSection = within(screen.getByLabelText('collaborator-section'))
    expect(clientSection).toBeDefined()
  })
  test('Show select day  ', () => {
    const clientSection = within(screen.getByLabelText('select-day'))
    expect(clientSection).toBeDefined()
  })

  test('Show days  ', () => {
    const datesList = screen.getAllByLabelText('data-day')
    datesList.forEach((date) => {
      expect(date).toBeDefined()
    })
  })
})
