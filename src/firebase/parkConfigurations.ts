import { ParkConfiguration } from '@/types/parkConfiguration'
import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'
import { increment, where } from 'firebase/firestore'

/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'parkConfigurations'
type ItemType = ParkConfiguration
type NewItem = Partial<ParkConfiguration>

export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

// export const setParkConfiguration = async (
//   itemId: ItemType['id'],
//   newItem: NewItem
// ) => await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createParkConfiguration = async (newItem: NewItem) =>
  await itemCRUD.createItem({ ...newItem })

export const updateParkConfiguration = async (
  itemId: string,
  updates: Partial<ItemType> | NewItem
) => await itemCRUD.updateItem(itemId, updates)

export const deleteParkConfiguration = async (itemId: BaseType['id']) =>
  await itemCRUD.deleteItem(itemId)

export const getParkConfiguration = async (itemId: BaseType['id']) =>
  await itemCRUD.getItem(itemId)

export const listenParkConfigurations = async (cb: CallableFunction) =>
  await itemCRUD.listenItems([], cb)

export const listenSelectedParkConfiguration = async (cb: CallableFunction) =>
  await itemCRUD.listenItems([where('selected', '==', true)], cb)

export const incrementUsersCount = async (
  itemId: BaseType['id'],
  count: number = 1
) => await itemCRUD.updateItem(itemId, { usersCount: increment(count) })
