import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import Navigation from '@/components/Navigation'

describe('Navigation component', () => {
  beforeEach(() => {
    render(<Navigation />)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('renders the logo', () => {
    const logoElement = screen.getByRole('logo')
    expect(logoElement).toBeDefined()
  })

  test('opens the user menu when the avatar is clicked', async () => {
    const avatar = screen.findByLabelText('open-user-menu')
    expect(avatar).toBeDefined()
    fireEvent.click(await avatar)
    const userMenu = await screen.findByLabelText('user-menu')
    expect(userMenu).toBeDefined()
  })
})
