import ClientOptions from '@/components/ClientOptions'
import { render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

describe('Client optios section', () => {
  beforeEach(() => {
    render(<ClientOptions />)
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  test('Show client section', () => {
    const clientSection = within(screen.getByLabelText('client-section'))
    expect(clientSection).toBeDefined()
  })
  test('Show client activities', () => {
    const clientActivites = within(screen.getByLabelText('client-activites'))
    expect(clientActivites).toBeDefined()
  })
  test('Show client promotions', () => {
    const clientActivites = within(screen.getByLabelText('client-offers'))
    expect(clientActivites).toBeDefined()
  })
})
