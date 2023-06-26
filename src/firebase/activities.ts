import { ParkActivity } from '@/types/activities'
import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'

/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'activities'
type ItemType = ParkActivity
type NewItem = Partial<ParkActivity>

export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setActivity = async (itemId: ItemType['id'], newItem: NewItem) =>
  await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createActivity = async (newItem: NewItem) =>
  await itemCRUD.createItem({ ...newItem })

export const updateActivity = async (
  itemId: string,
  updates: Partial<ItemType> | NewItem
) => await itemCRUD.updateItem(itemId, updates)

export const deleteActivity = async (itemId: BaseType['id']) =>
  await itemCRUD.deleteItem(itemId)

export const getActivity = async (itemId: BaseType['id']) =>
  await itemCRUD.getItem(itemId)

export const listenActivity = async (
  itemId: BaseType['id'],
  cb: CallableFunction
) => await itemCRUD.listenItem(itemId, cb)

export const listenActivities = async (cb: CallableFunction) =>
  await itemCRUD.listenItems([], cb)
