import { UserType } from '@/types/user'

export const client: UserType = {
  name: 'Fernando Faez',
  email: 'mail@example.com',
  birthday: new Date(1990, 7, 12),
  rol: 'CLIENT',
  phone: '525543375016',
  emergencyPhone: '525543374016'
}

export const collaborator: UserType = {
  name: 'Hector Hirales',
  email: 'mail@example.com',
  birthday: new Date(1999, 3, 28),
  rol: 'COLLABORATOR',
  phone: '525543375016',
  emergencyPhone: '525543374016'
}

export const coordinator: UserType = {
  name: 'Gabriela Gutierrez',
  email: 'mail@example.com',
  birthday: new Date(2002, 1, 4),
  rol: 'COORDINATOR',
  phone: '525543375016',
  emergencyPhone: '525543374016'
}
