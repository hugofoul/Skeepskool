import { useEffect, useMemo, useState } from 'react'

const DEFAULT_CONDITIONS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR64XSBpt3_1ZfQ2u_povtkQcJv1iGnxdGpjlaWnDKguUiFFwfdV1tB2GpqzmL-0btADUB_pS-CgZML/pub?gid=591385657&single=true&output=csv'

function decodeCsvCell(value) {
  const trimmed = value.trim()
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1).replace(/""/g, '"').trim()
  }
  return trimmed
}

function toParagraphs(rawText) {
  const content = rawText.replace(/^\uFEFF/, '').trim()
  if (!content) return []

  const lines = content
    .split(/\r?\n/)
    .map((line) => decodeCsvCell(line))
    .map((line) => line.trim())
    .filter(Boolean)

  if (!lines.length) return []

  const paragraphs = []
  let current = ''

  lines.forEach((line) => {
    if (!current) {
      current = line
      return
    }

    if (/[.!?:]$/.test(current)) {
      paragraphs.push(current)
      current = line
      return
    }

    current = `${current} ${line}`.replace(/\s+/g, ' ').trim()
  })

  if (current) {
    paragraphs.push(current)
  }

  return paragraphs
}

function normalizeLine(line) {
  return line
    .replace(/^[-•]\s*/, '')
    .replace(/^\uFEFF/, '')
    .trim()
}

function buildWeekendParagraphs(rawText, lang) {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => decodeCsvCell(line))
    .map(normalizeLine)
    .filter(Boolean)

  if (!lines.length) return []

  const detailLine =
    lines.find((line) => /vagues?/i.test(line) && /vent/i.test(line)) ||
    lines.find((line) => /conditions? de surf/i.test(line)) ||
    ''

  const waterLine =
    lines.find((line) => /\beau\b/i.test(line) && /\d+\s*°?\s*c/i.test(line)) ||
    lines.find((line) => /water/i.test(line) && /\d+\s*°?\s*c/i.test(line)) ||
    ''

  const vibeLine =
    lines.find((line) => /tous les niveaux/i.test(line)) ||
    lines.find((line) => /all levels/i.test(line)) ||
    ''

  const details = detailLine ? detailLine.replace(/^.*?:\s*/, '').trim() : ''

  const paragraphs = []

  if (details) {
    if (lang === 'fr') {
      paragraphs.push(`Prévisions pour ce week-end : ${details}`)
    } else {
      paragraphs.push(`Forecast for this weekend: ${details}`)
    }
  }

  if (waterLine) {
    paragraphs.push(waterLine)
  }

  if (vibeLine) {
    paragraphs.push(vibeLine)
  }

  return paragraphs
}

export function useSurfConditions({ lang = 'fr', fallbackParagraphs = [] }) {
  const csvUrl =
    import.meta.env.VITE_WEEKLY_BULLETIN_CSV_URL?.trim() ||
    import.meta.env.VITE_GOOGLE_SHEETS_CONDITIONS_CSV_URL?.trim() ||
    DEFAULT_CONDITIONS_CSV_URL

  const fallbackValue = useMemo(() => fallbackParagraphs, [fallbackParagraphs])
  const [state, setState] = useState({
    paragraphs: fallbackValue,
    isLive: false,
  })

  useEffect(() => {
    let cancelled = false

    async function loadConditions() {
      try {
        const response = await fetch(csvUrl)
        if (!response.ok) {
          throw new Error(`Unable to load CSV (${response.status})`)
        }

        const text = await response.text()
        const weekendParagraphs = buildWeekendParagraphs(text, lang)
        const paragraphs = weekendParagraphs.length ? weekendParagraphs : toParagraphs(text)

        if (!cancelled) {
          setState({
            paragraphs: paragraphs.length ? paragraphs : fallbackValue,
            isLive: paragraphs.length > 0,
          })
        }
      } catch {
        if (!cancelled) {
          setState({ paragraphs: fallbackValue, isLive: false })
        }
      }
    }

    loadConditions()

    return () => {
      cancelled = true
    }
  }, [csvUrl, fallbackValue, lang])

  return {
    ...state,
    csvUrl,
  }
}
