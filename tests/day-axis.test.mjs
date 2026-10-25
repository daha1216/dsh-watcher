// Regression: the insights day axis must be built by calendar arithmetic.
//
// Fixed-millisecond subtraction (`now - i * 86400000`) repeats a date on the
// fall-back transition and skips one on spring-forward. A skipped date has no
// bucket, so that day's sessions vanish from the chart; a repeated date is
// plotted twice.
//
// The whole file runs under a DST timezone on purpose. The first assertion is a
// self-check: if TZ ever fails to apply the test fails loudly instead of
// silently passing in a zone without DST (which is exactly how this bug hid).

process.env.TZ = 'America/New_York'

import test from 'node:test'
import assert from 'node:assert/strict'
import { DAY_MS, dayKey, previousDayKey, recentDayKeys, startOfDay, windowStart } from '../src/insights/day-axis.mjs'

// 2026-11-01 23:30 in New York: the fall-back transition happened at 02:00 that day.
const FALL_BACK = Date.parse('2026-11-02T04:30:00Z')
// 2026-03-09 00:30 in New York: spring-forward was 2026-03-08 02:00.
const SPRING_FORWARD = Date.parse('2026-03-09T04:30:00Z')

test('runs in a DST timezone', () => {
  assert.equal(new Date(FALL_BACK).getTimezoneOffset(), 300, 'expected EST (UTC-5)')
  assert.equal(new Date(SPRING_FORWARD).getTimezoneOffset(), 240, 'expected EDT (UTC-4)')
})

test('fall-back day does not duplicate a key', () => {
  const keys = recentDayKeys(FALL_BACK, 4)
  assert.deepEqual(keys, ['2026-10-29', '2026-10-30', '2026-10-31', '2026-11-01'])
  assert.equal(new Set(keys).size, keys.length)
})

test('spring-forward day does not skip a key', () => {
  const keys = recentDayKeys(SPRING_FORWARD, 4)
  assert.deepEqual(keys, ['2026-03-06', '2026-03-07', '2026-03-08', '2026-03-09'])
  assert.equal(new Set(keys).size, keys.length)
})

test('yesterday is the previous calendar day across both transitions', () => {
  assert.equal(previousDayKey(FALL_BACK), '2026-10-31')
  assert.equal(previousDayKey(SPRING_FORWARD), '2026-03-08')
  // The naive `now - DAY_MS` is wrong on the day after spring-forward: 24h before
  // 2026-03-09 00:30 EDT is 2026-03-07 23:30 EST, two calendar days back.
  assert.notEqual(dayKey(SPRING_FORWARD - DAY_MS), '2026-03-08')
})

test('window start is the start of the oldest plotted day', () => {
  assert.equal(windowStart(FALL_BACK, 4), new Date('2026-10-29T00:00:00').getTime())
  assert.equal(windowStart(SPRING_FORWARD, 4), new Date('2026-03-06T00:00:00').getTime())
})

test('a one-day window is exactly today', () => {
  assert.deepEqual(recentDayKeys(FALL_BACK, 1), ['2026-11-01'])
  assert.equal(windowStart(FALL_BACK, 1), startOfDay(FALL_BACK))
})

test('long windows stay unique and ordered across two transitions', () => {
  const keys = recentDayKeys(FALL_BACK, 400)
  assert.equal(keys.length, 400)
  assert.equal(new Set(keys).size, 400)
  for (let i = 1; i < keys.length; i++) assert.ok(keys[i] > keys[i - 1], `not ascending at ${i}`)
  assert.equal(keys.at(-1), '2026-11-01')
})
