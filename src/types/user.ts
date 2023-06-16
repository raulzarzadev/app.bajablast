export type UserType = {
  name: string
  email: string
  phone: string
  birthday: Date
  rol: 'CLIENT' | 'COLLABORATOR' | 'COORDINATOR' | 'ADMIN'
  emergencyPhone: string
}
