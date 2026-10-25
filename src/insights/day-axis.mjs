// Calendar-day helpers for the insights dashboard.
//
// A day key is a LOCAL calendar day (`YYYY-MM-DD`). Day arithmetic must go
// through setDate(), never `ms - n * 86400000`: a local day is 23 or 25 hours
// long across a DST transition, so fixed-millisecond subtraction repeats a date
// (fall back) or skips one (spring forward). When a key is skipped, that day's
// sessions find no bucket and silently disappear from the chart; when a key is
// repeated, the same bucket is plotted twice.
//
// Kept as plain ESM so `node --test` can exercise it without a TS toolchain,
// matching the existing `presentation.mjs` / `pricing.mjs` convention.

export const DAY_MS = 86_400_000

/** Local calendar key for an instant. */
export function dayKey(ms) {
  const d = new Date(ms)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Start of the local day containing `ms`. */
export function startOfDay(ms) {
  const d = new Date(ms)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

/** `days` consecutive local day keys, oldest first, ending with the day containing `nowMs`. */
export function recentDayKeys(nowMs, days) {
  const end = new Date(nowMs)
  end.setHours(0, 0, 0, 0)
  const keys = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end)
    d.setDate(end.getDate() - i)
    keys.push(dayKey(d.getTime()))
  }
  return keys
}

/** Key of the local day before the one containing `ms`. */
export function previousDayKey(ms) {
  const d = new Date(ms)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - 1)
  return dayKey(d.getTime())
}

/**
 * Start of the oldest day in a `days`-day window ending with the day containing
 * `nowMs`. Rows older than this fall outside every bucket, so filtering here
 * keeps the scan and the plotted axis on the same calendar window.
 */
export function windowStart(nowMs, days) {
  const d = new Date(nowMs)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - (days - 1))
  return d.getTime()
}
