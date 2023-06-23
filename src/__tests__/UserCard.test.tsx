import { collaborator } from '@/CONST/fake-users'
import UserCard from '@/components/UserCard'
import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

describe('User Card Information', () => {
  beforeEach(() => {
    render(<UserCard user={collaborator} />)
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  test('should render user card', async () => {
    const userCard = screen.getByLabelText('user-card')
    expect(userCard).toBeDefined()
  })
  test('should render user name', async () => {
    const userName = screen.getByLabelText('user-name')
    expect(userName)
  })
  test('should render user email', async () => {
    const userMail = screen.getByLabelText('user-email')
    expect(userMail)
  })
  test('should render user mobil', async () => {
    const userMobil = screen.getByLabelText('user-mobil')
    expect(userMobil)
  })
  test('should render user emergency mobil', async () => {
    const userMobilEmergency = screen.getByLabelText('user-mobil-emergency')
    expect(userMobilEmergency)
  })
  test('should render user age', async () => {
    const userAge = screen.getByLabelText('user-age')
    expect(userAge)
  })
  test('should render user rol', async () => {
    const userRol = screen.getByLabelText('user-rol')
    expect(userRol)
  })
})
