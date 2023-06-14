import { expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Navigation from '@/components/Navigation'

test('home', () => {
  const { debug } = render(<Navigation />)
  debug()

  // expect(nav.findByRole('user-menu')).toBeDefined()
  // expect(
  //   main.getByRole('heading', { level: 1, name: 'Bienvenidos a Baja Blast' })
  // ).toBeDefined()

  // expect(main.getByText('Registrate')).toBeDefined()
})
