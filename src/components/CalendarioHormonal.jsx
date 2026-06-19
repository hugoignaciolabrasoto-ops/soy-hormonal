import React from 'react'
import { PHASES } from '../utils/phaseConfig'
import { getCalendarDays } from '../utils/cycleAlgorithm'
import { todayMetrics, cycleHistory } from '../data/sampleData'

const DAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

function PhaseTimeline({ dayOfCycle, avgCycleLength }) {
  const phases = [
    { id: 'menstrual', label: 'Mens.', start: 1, end: 5 },
    { id: 'folicular', label: 'Folic.', start: 6, end: 13 },
    { id: 'ovulatoria', label: 'Ovul.', start: 14, end: 16 },
    { id: 'lutea', label: 'Lútea', start: 17, end: avgCycleLength },
  ]

  return (
    <div className="flex gap-1 h-6 rounded-full overflow-hidden">
      {phases.map(({ id, start, end }) => {
        const pc = PHASES[id]
        const width = ((end - start + 1) / avgCycleLength) * 100
        const isActive = dayOfCycle >= start && dayOfCycle <= end

        return (
          <div
            key={id}
            className="relative flex items-center justify-center text-[9px] font-bold"
            style={{
              width: `${width}%`,
              backgroundColor: isActive ? pc.textColor : pc.bgColor,
              color: isActive ? 'white' : pc.textColor,
              borderRadius: id === 'menstrual' ? '999px 0 0 999px' : id === 'lutea' ? '0 999px 999px 0' : '0',
            }}
          >
            {isActive && (
              <div
                className="absolute w-2 h-2 rounded-full bg-white"
                style={{
                  left: `${((dayOfCycle - start) / (end - start + 1)) * 100}%`,
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 0 2px currentColor',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function MiniCalendar({ cycleInfo }) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const prevPeriodStart = cycleHistory.length >= 2
    ? cycleHistory[cycleHistory.length - 2].startDate
    : null

  const days = getCalendarDays(
    year,
    month,
    cycleInfo.lastPeriodStart,
    prevPeriodStart,
    cycleInfo.avgCycleLength,
  )

  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {MONTH_NAMES[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-0.5">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">
            {d}
          </div>
        ))}
        {days.map((cell, i) => {
          if (!cell) {
            return <div key={`empty-${i}`} />
          }
          const pc = PHASES[cell.phase]
          return (
            <div
              key={i}
              className="aspect-square flex items-center justify-center rounded-lg text-xs font-semibold relative"
              style={{
                backgroundColor: cell.isFuture ? `${pc.bgColor}80` : pc.bgColor,
                color: cell.isFuture ? `${pc.textColor}60` : pc.textColor,
                outline: cell.isToday ? `2.5px solid ${pc.textColor}` : 'none',
                outlineOffset: '-1px',
                fontWeight: cell.isToday ? '800' : '600',
              }}
            >
              {cell.day}
              {cell.isToday && (
                <div
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: pc.textColor }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Phase legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
        {Object.entries(PHASES).map(([key, pc]) => (
          <div key={key} className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: pc.bgColor, border: `1px solid ${pc.accentColor}` }} />
            <span className="text-[10px] text-gray-500">{pc.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CalendarioHormonal({ cycleInfo }) {
  const pc = cycleInfo.phaseConfig
  const { daysUntilNextPeriod, nextPeriodDate, dayOfCycle, avgCycleLength } = cycleInfo

  const nextDateStr = nextPeriodDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
  })

  const progressPct = Math.min(100, (dayOfCycle / avgCycleLength) * 100)

  return (
    <div className="p-4 space-y-4 pb-6">

      {/* Phase card */}
      <div
        className="rounded-2xl p-4"
        style={{ backgroundColor: pc.bgColor }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{pc.emoji}</span>
              <span className="text-lg font-bold" style={{ color: pc.textColor }}>
                Fase {pc.name}
              </span>
            </div>
            <p className="text-sm font-medium opacity-75" style={{ color: pc.textColor }}>
              {pc.description}
            </p>
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: pc.textColor, color: 'white' }}
          >
            Días {pc.days}
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium" style={{ color: pc.textColor }}>
            <span>Día {dayOfCycle} de {avgCycleLength}</span>
            <span>{Math.round(progressPct)}% del ciclo</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${pc.textColor}20` }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progressPct}%`, backgroundColor: pc.textColor }}
            />
          </div>
        </div>
      </div>

      {/* Phase timeline */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tu ciclo</p>
        <PhaseTimeline dayOfCycle={dayOfCycle} avgCycleLength={avgCycleLength} />
        <div className="flex justify-between mt-2">
          {[
            { label: 'Menstrual', days: '1–5', phase: 'menstrual' },
            { label: 'Folicular', days: '6–13', phase: 'folicular' },
            { label: 'Ovulatoria', days: '14–16', phase: 'ovulatoria' },
            { label: 'Lútea', days: '17–28', phase: 'lutea' },
          ].map(({ label, days, phase }) => (
            <div key={phase} className="text-center">
              <p className="text-[9px] font-bold" style={{ color: PHASES[phase].textColor }}>{label}</p>
              <p className="text-[9px] text-gray-400">{days}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini calendar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <MiniCalendar cycleInfo={cycleInfo} />
      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Métricas de hoy</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Energía', value: `${todayMetrics.energy}%`, icon: '⚡', color: pc.textColor },
            { label: 'Peso', value: `${todayMetrics.weight} kg`, icon: '⚖️', color: pc.textColor },
            { label: 'Sueño', value: `${todayMetrics.sleep} h`, icon: '💤', color: pc.textColor },
          ].map(({ label, value, icon, color }) => (
            <div
              key={label}
              className="rounded-xl p-3 text-center"
              style={{ backgroundColor: pc.bgColor }}
            >
              <div className="text-xl mb-1">{icon}</div>
              <p className="text-base font-bold leading-tight" style={{ color }}>{value}</p>
              <p className="text-[10px] font-medium opacity-60 mt-0.5" style={{ color }}>{label}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2"
          style={{ backgroundColor: `${pc.bgColor}80` }}
        >
          <span className="text-sm">💧</span>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold" style={{ color: pc.textColor }}>Hidratación</span>
              <span className="text-xs font-bold" style={{ color: pc.textColor }}>{todayMetrics.water} / 2.5 L</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ backgroundColor: `${pc.textColor}20` }}>
              <div
                className="h-1.5 rounded-full"
                style={{
                  width: `${(todayMetrics.water / 2.5) * 100}%`,
                  backgroundColor: pc.textColor,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Next period insight */}
      <div
        className="rounded-2xl p-4"
        style={{ backgroundColor: '#FFF5F5', border: '1px solid #FECACA' }}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">🩸</div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#A32D2D]">Próxima menstruación</p>
            <p className="text-xs text-[#A32D2D] opacity-80 mt-0.5">
              En <strong>{daysUntilNextPeriod} días</strong> · {nextDateStr}
            </p>
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: '#A32D2D' }}
          >
            {daysUntilNextPeriod}d
          </div>
        </div>
      </div>
    </div>
  )
}
