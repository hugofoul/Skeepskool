import { useEffect, useMemo, useState } from 'react'

const DEFAULT_SCHEDULE_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR64XSBpt3_1ZfQ2u_povtkQcJv1iGnxdGpjlaWnDKguUiFFwfdV1tB2GpqzmL-0btADUB_pS-CgZML/pub?gid=0&single=true&output=csv'

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

function mapScheduleRows(rawRows, lang, fallbackDays, allLevelsLabel) {
  if (!rawRows.length) {
    return fallbackDays
  }

  const today = startOfDay(new Date())

  const dayFormatter = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    weekday: 'long',
  })

  const groupedDays = new Map()

  rawRows.forEach((row) => {
    const date = parseDate(row.jour || row.date || row.day)
    const time = normalizeTime(row.heure || row.time || row.hour)
    const type = row.type || ''
    const level = row.niveau || row.level || allLevelsLabel

    if (!date || !time) return

    if (startOfDay(date) < today) return

    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const dayLabel = capitalize(dayFormatter.format(date))
    const slot = {
      time,
      type,
      level: level || allLevelsLabel,
      sortKey: `${key}-${time}`,
    }

    if (!groupedDays.has(key)) {
      groupedDays.set(key, { day: dayLabel, date, slots: [slot] })
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

export function useWeeklySchedule({ lang, fallbackDays = [], allLevelsLabel = 'Tous niveaux' }) {
  const csvUrl = import.meta.env.VITE_GOOGLE_SHEETS_CSV_URL?.trim() || DEFAULT_SCHEDULE_CSV_URL
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

        if (lines.length < 2) {
          if (!cancelled) {
            setState({ days: fallbackValue, isLive: false })
          }
          return
        }

        const headers = parseCsvLine(lines[0]).map(normalizeHeader)
        const rows = lines.slice(1).map((line) => {
          const values = parseCsvLine(line)
          return headers.reduce((record, header, index) => {
            record[header] = values[index] || ''
            return record
          }, {})
        })

        const days = mapScheduleRows(rows, lang, fallbackValue, allLevelsLabel)

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