const DATE_UNITS: Record<string, number> = {
  year: 31536000,
  month: 2629800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
} as const

const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

export const getRelativeTime = (epochTime: number) => {
  const started = new Date(epochTime * 1000).getTime()
  const now = new Date().getTime()

  const elapsed = (started - now) / 1000

  for (const unit in DATE_UNITS) {
    const absoluteElapsed = Math.abs(elapsed)

    const unitValue = DATE_UNITS[unit as keyof typeof DATE_UNITS]
    if (unitValue !== undefined && (absoluteElapsed > unitValue || unit === 'second')) {
      return rtf.format(
        Math.round(elapsed / unitValue),
        unit as Intl.RelativeTimeFormatUnit
      )
    }
  }

  return ''
}
