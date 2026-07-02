import { useEffect, useMemo, useState } from 'react'

const DEFAULT_SCHEDULE_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR64XSBpt3_1ZfQ2u_povtkQcJv1iGnxdGpjlaWnDKguUiFFwfdV1tB2GpqzmL-0btADUB_pS-CgZML/pub?gid=0&single=true&output=csv'

const MONTH_INDEX = {
  janvier: 0,
  fevrier: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  aout: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  decembre: 11,
}

function parseCsvLine(line) {
  const values = []
  let current = ''
  let inQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]

    if (char === '"') {
      const nextChar = line[index + 1]
      if (inQuotes && nextChar === '"') {
        current += '"'
        index += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (char === ',' && !inQuotes) {
      values.push(current.trim())
      current = ''
      continue
    }

    current += char
  }

  values.push(current.trim())
  return values
}

function normalizeHeader(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .toLowerCase()
    .trim()
}

function parseDate(value) {
  if (!value) return null

  const frenchMatch = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (frenchMatch) {
    const [, day, month, year] = frenchMatch
    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function normalizeTime(value) {
  if (!value) return ''
  const match = value.match(/^(\d{1,2}):(\d{2})/)
  if (!match) return value
  const [, hours, minutes] = match
  return `${hours.padStart(2, '0')}:${minutes}`
}

function startOfDay(date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value
}

function normalizeBulletLine(line) {
  return line
    .replace(/^[-•]\s*/, '')
    .replace(/^\uFEFF/, '')
    .trim()
}

function normalizeMonthKey(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function toDateFromFrenchParts(dayRaw, monthRaw) {
  const monthIndex = MONTH_INDEX[normalizeMonthKey(monthRaw)]
  if (monthIndex === undefined) return null

  const now = new Date()
  const day = Number(dayRaw.replace(/er$/i, ''))
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  const candidateThisYear = new Date(currentYear, monthIndex, day)
  const diffMonths = monthIndex - currentMonth

  if (diffMonths < -8) {
    return new Date(currentYear + 1, monthIndex, day)
  }

  if (diffMonths > 8) {
    return new Date(currentYear - 1, monthIndex, day)
  }

  return candidateThisYear
}

function buildDaysFromEntries(entries, lang, fallbackDays) {
  if (!entries.length) return fallbackDays

  const today = startOfDay(new Date())
  const dayLocale = lang === 'fr' ? 'fr-FR' : (lang === 'de' ? 'de-DE' : 'en-US')
  const dayFormatter = new Intl.DateTimeFormat(dayLocale, {
    weekday: 'long',
    day: 'numeric',
  })

  const groupedDays = new Map()

  entries.forEach((entry) => {
    if (!entry.date || !entry.time) return
    if (startOfDay(entry.date) < today) return

    const key = `${entry.date.getFullYear()}-${entry.date.getMonth()}-${entry.date.getDate()}`
    const dayLabel = capitalize(dayFormatter.format(entry.date))

    const slot = {
      time: entry.time,
      type: entry.type || '',
      level: entry.level,
      sortKey: `${key}-${entry.time}`,
    }

    if (!groupedDays.has(key)) {
      groupedDays.set(key, { day: dayLabel, date: entry.date, slots: [slot] })
      return
    }

    groupedDays.get(key).slots.push(slot)
  })

  const days = Array.from(groupedDays.values())
    .sort((left, right) => left.date - right.date)
    .map((day) => ({
      day: day.day,
      slots: day.slots
        .sort((left, right) => left.sortKey.localeCompare(right.sortKey))
        .map(({ sortKey: _sortKey, ...slot }) => slot),
    }))

  return days.length ? days : fallbackDays
}

function mapScheduleRows(rawRows, lang, fallbackDays, allLevelsLabel) {
  if (!rawRows.length) {
    return fallbackDays
  }

  const entries = rawRows.map((row) => {
    const date = parseDate(row.jour || row.date || row.day)
    const time = normalizeTime(row.heure || row.time || row.hour)

    return {
      date,
      time,
      type: row.type || '',
      level: row.niveau || row.level || allLevelsLabel,
    }
  })

  return buildDaysFromEntries(entries, lang, fallbackDays)
}

function parseBulletinEntries(rawText, allLevelsLabel) {
  const lines = rawText
    .split(/\r?\n/)
    .map(normalizeBulletLine)
    .filter(Boolean)

  const entries = []

  lines.forEach((line) => {
    const dateMatch = line.match(/^(?:[a-zA-ZÀ-ÿ]+)\s+(\d{1,2}(?:er)?)\s+([a-zA-ZÀ-ÿ]+)\s+à\s+(.+)$/i)
    if (!dateMatch) return

    const [, dayRaw, monthRaw, afterAt] = dateMatch
    const date = toDateFromFrenchParts(dayRaw, monthRaw)
    if (!date) return

    const times = [...afterAt.matchAll(/(\d{1,2})h(?:(\d{2}))?/gi)].map((match) => {
      const hours = String(Number(match[1])).padStart(2, '0')
      const minutes = match[2] || '00'
      return `${hours}:${minutes}`
    })

    if (!times.length) return

    const extraMatch = line.match(/\(([^)]+)\)/)
    const extra = extraMatch ? extraMatch[1] : ''
    const type = /sunset|afterwork/i.test(extra) ? 'Sunset-afterwork' : ''
    const level = extra && !/sunset|afterwork/i.test(extra) ? extra : allLevelsLabel

    times.forEach((time) => {
      entries.push({ date, time, type, level })
    })
  })

  return entries
}

function mapBulletinText(rawText, lang, fallbackDays, allLevelsLabel) {
  const entries = parseBulletinEntries(rawText, allLevelsLabel)
  return buildDaysFromEntries(entries, lang, fallbackDays)
}

export function useWeeklySchedule({ lang, fallbackDays = [], allLevelsLabel = 'Tous niveaux' }) {
  const csvUrl =
    import.meta.env.VITE_WEEKLY_BULLETIN_CSV_URL?.trim() ||
    import.meta.env.VITE_GOOGLE_SHEETS_CSV_URL?.trim() ||
    DEFAULT_SCHEDULE_CSV_URL

  const fallbackValue = useMemo(() => fallbackDays, [fallbackDays])
  const [state, setState] = useState({
    days: fallbackValue,
    isLive: false,
  })

  useEffect(() => {
    let cancelled = false

    async function loadSchedule() {
      try {
        const response = await fetch(csvUrl)
        if (!response.ok) {
          throw new Error(`Unable to load CSV (${response.status})`)
        }

        const csv = await response.text()
        const lines = csv
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)

        let days = fallbackValue

        if (lines.length >= 2) {
          const headers = parseCsvLine(lines[0]).map(normalizeHeader)
          const rows = lines.slice(1).map((line) => {
            const values = parseCsvLine(line)
            return headers.reduce((record, header, index) => {
              record[header] = values[index] || ''
              return record
            }, {})
          })

          days = mapScheduleRows(rows, lang, fallbackValue, allLevelsLabel)
        }

        if (days === fallbackValue) {
          days = mapBulletinText(csv, lang, fallbackValue, allLevelsLabel)
        }

        if (!cancelled) {
          setState({
            days,
            isLive: days !== fallbackValue,
          })
        }
      } catch {
        if (!cancelled) {
          setState({ days: fallbackValue, isLive: false })
        }
      }
    }

    loadSchedule()

    return () => {
      cancelled = true
    }
  }, [allLevelsLabel, csvUrl, fallbackValue, lang])

  return {
    ...state,
    csvUrl,
  }
}
