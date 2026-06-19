export function getDayOfCycle(lastPeriodStart) {
  const start = new Date(lastPeriodStart)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  start.setHours(0, 0, 0, 0)
  return Math.floor((today - start) / 86400000) + 1
}

export function getCurrentPhase(dayOfCycle) {
  if (dayOfCycle >= 1 && dayOfCycle <= 5) return 'menstrual'
  if (dayOfCycle >= 6 && dayOfCycle <= 13) return 'folicular'
  if (dayOfCycle >= 14 && dayOfCycle <= 16) return 'ovulatoria'
  return 'lutea'
}

export function getPhaseForDay(dayOfCycle) {
  if (dayOfCycle < 1) return null
  if (dayOfCycle <= 5) return 'menstrual'
  if (dayOfCycle <= 13) return 'folicular'
  if (dayOfCycle <= 16) return 'ovulatoria'
  return 'lutea'
}

export function getAverageCycleLength(cycles) {
  if (cycles.length < 2) return 28
  const lengths = []
  for (let i = 1; i < cycles.length; i++) {
    const a = new Date(cycles[i - 1].startDate)
    const b = new Date(cycles[i].startDate)
    lengths.push(Math.round((b - a) / 86400000))
  }
  return Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length)
}

export function getNextPeriodDate(lastPeriodStart, avgCycleLength) {
  const d = new Date(lastPeriodStart)
  d.setDate(d.getDate() + avgCycleLength)
  return d
}

export function getDaysUntil(targetDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const t = new Date(targetDate)
  t.setHours(0, 0, 0, 0)
  return Math.max(0, Math.floor((t - today) / 86400000))
}

export function getCalendarDays(year, month, lastPeriodStart, prevPeriodStart, avgCycleLength) {
  const firstDay = new Date(year, month, 1)
  const totalDays = new Date(year, month + 1, 0).getDate()
  const startDow = (firstDay.getDay() + 6) % 7 // Mon=0

  const currentStart = new Date(lastPeriodStart)
  currentStart.setHours(0, 0, 0, 0)

  const prevStart = prevPeriodStart ? new Date(prevPeriodStart) : null
  if (prevStart) prevStart.setHours(0, 0, 0, 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const days = Array(startDow).fill(null)

  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d)
    date.setHours(0, 0, 0, 0)

    const diffCurrent = Math.floor((date - currentStart) / 86400000)
    let dayOfCycle

    if (diffCurrent >= 0) {
      dayOfCycle = diffCurrent + 1
    } else if (prevStart) {
      const diffPrev = Math.floor((date - prevStart) / 86400000)
      dayOfCycle = diffPrev + 1
    } else {
      dayOfCycle = avgCycleLength + diffCurrent + 1
    }

    const phase = getPhaseForDay(dayOfCycle) || 'lutea'
    const isToday = date.getTime() === today.getTime()
    const isFuture = date > today

    days.push({ day: d, phase, isToday, isFuture, dayOfCycle })
  }

  return days
}
