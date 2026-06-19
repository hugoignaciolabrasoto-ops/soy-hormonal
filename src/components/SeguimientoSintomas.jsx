import React, { useState } from 'react'
import { initialMood, initialSymptoms, weeklyEnergy } from '../data/sampleData'

const MOODS = [
  { value: 1, emoji: '😢', label: 'Muy mal' },
  { value: 2, emoji: '😟', label: 'Mal' },
  { value: 3, emoji: '😐', label: 'Regular' },
  { value: 4, emoji: '🙂', label: 'Bien' },
  { value: 5, emoji: '😊', label: 'Muy bien' },
]

function EnergyChart({ data, color }) {
  const max = 100
  const W = 32
  const GAP = 6
  const H = 80
  const totalW = data.length * (W + GAP) - GAP

  return (
    <svg
      viewBox={`0 0 ${totalW} ${H + 24}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {data.map((item, i) => {
        const barH = Math.max(4, (item.value / max) * H)
        const x = i * (W + GAP)
        const y = H - barH

        return (
          <g key={i}>
            <rect
              x={x}
              y={H}
              width={W}
              height={0}
              rx="6"
              fill={`${color}30`}
            />
            <rect
              x={x}
              y={y}
              width={W}
              height={barH}
              rx="6"
              fill={color}
              opacity="0.85"
            />
            <text
              x={x + W / 2}
              y={H + 16}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="#9CA3AF"
            >
              {item.day}
            </text>
            <text
              x={x + W / 2}
              y={y - 4}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill={color}
              opacity="0.9"
            >
              {item.value}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function SymptomBar({ symptom, color }) {
  const [value, setValue] = useState(symptom.value)
  const pct = (value / 10) * 100

  const intensity = value <= 3 ? 'Bajo' : value <= 6 ? 'Medio' : 'Alto'
  const intensityColor = value <= 3 ? '#22C55E' : value <= 6 ? '#F59E0B' : '#EF4444'

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{symptom.icon}</span>
          <span className="text-sm font-semibold text-gray-700">{symptom.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${intensityColor}18`, color: intensityColor }}>
            {intensity}
          </span>
          <span className="text-sm font-bold w-6 text-right" style={{ color }}>{value}</span>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
        style={{
          background: `linear-gradient(to right, ${color} ${pct}%, #E5E7EB ${pct}%)`,
          color,
        }}
      />
    </div>
  )
}

export default function SeguimientoSintomas({ cycleInfo }) {
  const [mood, setMood] = useState(initialMood)
  const pc = cycleInfo.phaseConfig

  const selectedMood = MOODS.find((m) => m.value === mood)

  return (
    <div className="p-4 space-y-4 pb-6">

      {/* Mood selector */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          ¿Cómo te sientes hoy?
        </p>
        <div className="flex justify-between items-center gap-1">
          {MOODS.map((m) => (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              className="flex flex-col items-center gap-1 flex-1 py-2 rounded-xl transition-all"
              style={{
                backgroundColor: mood === m.value ? pc.bgColor : 'transparent',
                outline: mood === m.value ? `2px solid ${pc.textColor}` : 'none',
              }}
            >
              <span
                className="transition-all"
                style={{ fontSize: mood === m.value ? '2rem' : '1.5rem' }}
              >
                {m.emoji}
              </span>
              <span
                className="text-[9px] font-semibold leading-tight text-center"
                style={{ color: mood === m.value ? pc.textColor : '#9CA3AF' }}
              >
                {m.label}
              </span>
            </button>
          ))}
        </div>
        {selectedMood && (
          <div
            className="mt-3 text-center py-2 rounded-xl text-sm font-medium"
            style={{ backgroundColor: pc.bgColor, color: pc.textColor }}
          >
            Te sientes <strong>{selectedMood.label.toLowerCase()}</strong> hoy {selectedMood.emoji}
          </div>
        )}
      </div>

      {/* Symptoms */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          Síntomas de hoy
        </p>
        <div className="space-y-4">
          {initialSymptoms.map((symptom) => (
            <SymptomBar key={symptom.id} symptom={symptom} color={pc.textColor} />
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-3 text-center">
          Desliza cada barra para ajustar la intensidad
        </p>
      </div>

      {/* Energy chart */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Energía · Últimos 7 días
          </p>
          <span
            className="text-xs font-bold px-2 py-1 rounded-full"
            style={{ backgroundColor: pc.bgColor, color: pc.textColor }}
          >
            ⚡ {weeklyEnergy[weeklyEnergy.length - 1].value}%
          </span>
        </div>
        <EnergyChart data={weeklyEnergy} color={pc.textColor} />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-gray-400">Lunes</span>
          <span className="text-[10px] text-gray-400">Hoy</span>
        </div>
      </div>

      {/* Note */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Nota del día
        </p>
        <textarea
          className="w-full text-sm text-gray-700 resize-none outline-none placeholder-gray-300 leading-relaxed"
          rows={3}
          placeholder="¿Cómo ha sido tu día? Anota lo que quieras recordar…"
          defaultValue="Me siento con mucha energía y claridad. Hoy fue un gran día para la comunicación."
          style={{ fontFamily: 'inherit' }}
        />
      </div>
    </div>
  )
}
