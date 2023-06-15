export type UserType = {
  name: string
  email: string
  mobile: string
  birthday: Date
  rol: 'CLIENT' | 'COLLABORATOR' | 'COORDINATOR' | 'ADMIN'
  emergencyMobil: string
}
