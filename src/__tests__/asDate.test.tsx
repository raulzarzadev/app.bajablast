import asDate from '@/utils/asDate'
import { Timestamp } from 'firebase/firestore'
import { describe, expect, test } from 'vitest'

describe(' Validate if value past is a valid date and return it', () => {
  test('no date is past, return null', () => {
    expect(asDate()).toBeNull()
  })
  test('null date is past, return null', () => {
    expect(asDate(null)).toBeNull()
  })
  test('valid date is past, should return valid date', () => {
    expect(asDate(new Date())).toBeInstanceOf(Date)
  })
  test('valid date as number is past, should return valid date', () => {
    const dateNumber = new Date().getTime()
    expect(asDate(dateNumber)).toBeInstanceOf(Date)
  })
  test('valid date as ISO string is past, should return valid date', () => {
    const dateISOString = new Date().toISOString()
    expect(asDate(dateISOString)).toBeInstanceOf(Date)
  })
  test('valid date as USD format string is past, should return valid date', () => {
    const dateISOString = '12-07-2021'
    expect(asDate(dateISOString)).toBeInstanceOf(Date)
  })
  test('valid date Timestamp, should return valid date', () => {
    const timestampDate = new Timestamp(0, 0)
    expect(asDate(timestampDate)).toBeInstanceOf(Date)
  })
  test('object, should return null', () => {
    expect(asDate({})).toBeNull()
  })
})
