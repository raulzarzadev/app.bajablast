import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'

import { Reconciliation } from '@/types/reconciliations'

/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'reconciliations'
type ItemType = Reconciliation
type NewItem = Partial<Reconciliation>

export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

// export const setReconciliation = async (
//   itemId: ItemType['id'],
//   newItem: NewItem
// ) => await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createReconciliation = async (newItem: NewItem) =>
  await itemCRUD.createItem({ ...newItem })

// export const updateReconciliation = async (
//   itemId: string,
//   updates: Partial<ItemType> | NewItem
// ) => await itemCRUD.updateItem(itemId, updates)

export const deleteReconciliation = async (itemId: BaseType['id']) =>
  await itemCRUD.deleteItem(itemId)

export const getReconciliation = async (itemId: BaseType['id']) =>
  await itemCRUD.getItem(itemId)

export const listenReconciliations = async (cb: CallableFunction) =>
  await itemCRUD.listenItems([], cb)
