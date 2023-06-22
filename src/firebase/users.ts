import { UserType } from '@/types/user'
import { usersCRUD } from './auth'
import { where } from 'firebase/firestore'

export const setUser = async (itemId: string, newItem: object) =>
  await usersCRUD.setItem(itemId, newItem)

export const createUser = async (newItem: any) =>
  await usersCRUD.createItem(newItem)

export const updateUser = async (itemId: string, newItem: Partial<UserType>) =>
  await usersCRUD.updateItem(itemId, newItem)

export const deleteUser = async (itemId: string) =>
  await usersCRUD.deleteItem(itemId)

export const getUser = async (itemId: string) => await usersCRUD.getItem(itemId)

export const listenUser = async (itemId: string, cb: CallableFunction) =>
  await usersCRUD.listenItem(itemId, cb)

export async function findUserByEmail({ email }: { email: string }) {
  const formatFoundUser = (
    user: UserType
  ): Pick<UserType, 'name' | 'email' | 'id'> => {
    return {
      name: user?.name,
      email: user?.email,
      id: user?.id
    }
  }
  return await usersCRUD.getItems([where('email', '==', email)]).then((res) => {
    if (res?.length) return formatFoundUser(res[0])
    return null
  })
}

export const listenAppUsers = (cb: CallableFunction) => {
  return usersCRUD.listenItems([], cb)
}
