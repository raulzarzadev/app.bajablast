import asNumber from '@/utils/asNumber'
import { describe, expect, test } from 'vitest'

describe('validate numbers', () => {
  test('Return 0 if NaN, undefined or null is passed', () => {
    expect(asNumber()).toBe(0)
    expect(asNumber(null)).toBe(0)
    expect(asNumber(NaN)).toBe(0)
  })
  test('Return  number if number is past', () => {
    expect(asNumber(0)).toBe(0)
    expect(asNumber(2)).toBe(2)
  })
  test('return a valid number if number string is past', () => {
    expect(asNumber('0')).toBe(0)
    expect(asNumber('50')).toBe(50)
  })
  test('return 0 if invalid number string is past', () => {
    expect(asNumber('0d')).toBe(0)
    expect(asNumber('String')).toBe(0)
  })
})
