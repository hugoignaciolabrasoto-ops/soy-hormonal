import React from 'react'
import { nutritionByPhase } from '../data/sampleData'
import { PHASES } from '../utils/phaseConfig'

function MacroBadge({ label, color }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold"
      style={{ backgroundColor: `${color}18`, color }}
    >
      {label}
    </span>
  )
}

function FoodCard({ food, phaseColor }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: '#F9FAFB' }}>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: `${phaseColor}18` }}
      >
        {food.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 leading-tight">{food.name}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {food.macros.map((m) => (
            <MacroBadge key={m} label={m} color={phaseColor} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BibliotecaNutricion({ cycleInfo }) {
  const pc = cycleInfo.phaseConfig
  const data = nutritionByPhase[cycleInfo.phase]

  return (
    <div className="p-4 space-y-4 pb-6">

      {/* Phase header */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: pc.bgColor }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{pc.emoji}</span>
          <div>
            <p className="text-base font-bold" style={{ color: pc.textColor }}>
              Nutrición · Fase {pc.name}
            </p>
            <p className="text-xs font-medium opacity-75" style={{ color: pc.textColor }}>
              Días {pc.days} del ciclo
            </p>
          </div>
        </div>
        <div
          className="flex items-start gap-2 mt-3 p-3 rounded-xl"
          style={{ backgroundColor: `${pc.textColor}12` }}
        >
          <span className="text-base flex-shrink-0">🎯</span>
          <div>
            <p className="text-xs font-bold mb-0.5" style={{ color: pc.textColor }}>Enfoque nutricional</p>
            <p className="text-xs leading-relaxed" style={{ color: pc.textColor, opacity: 0.85 }}>
              {data.focus}
            </p>
          </div>
        </div>
        <p className="text-xs mt-3 leading-relaxed" style={{ color: pc.textColor, opacity: 0.75 }}>
          {data.tip}
        </p>
      </div>

      {/* Tabs for other phases (peek) */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Object.entries(PHASES).map(([key, p]) => (
          <div
            key={key}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{
              backgroundColor: key === cycleInfo.phase ? p.textColor : p.bgColor,
              color: key === cycleInfo.phase ? 'white' : p.textColor,
              borderColor: p.accentColor,
            }}
          >
            <span>{p.emoji}</span>
            <span>{p.name}</span>
            {key === cycleInfo.phase && <span className="opacity-80">· ahora</span>}
          </div>
        ))}
      </div>

      {/* Recommended foods */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
            style={{ backgroundColor: pc.textColor }}
          >
            <span className="text-white font-bold">✓</span>
          </div>
          <p className="text-sm font-bold text-gray-800">Recomendados hoy</p>
          <span
            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: pc.bgColor, color: pc.textColor }}
          >
            {data.recommended.length} alimentos
          </span>
        </div>
        <div className="space-y-2">
          {data.recommended.map((food) => (
            <FoodCard key={food.name} food={food} phaseColor={pc.textColor} />
          ))}
        </div>
      </div>

      {/* Foods to avoid */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs bg-amber-100">
            <span className="text-amber-600 font-bold">!</span>
          </div>
          <p className="text-sm font-bold text-gray-800">Mejor evitar</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.avoid.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: '#FFF3CD', color: '#92610A', border: '1px solid #F9D87A' }}
            >
              ⚠️ {item}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
          Estos alimentos pueden intensificar los síntomas durante la fase {pc.name.toLowerCase()}. Escucha cómo responde tu cuerpo.
        </p>
      </div>

      {/* Hydration tip */}
      <div
        className="rounded-2xl p-4"
        style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
      >
        <div className="flex gap-3">
          <span className="text-xl">💧</span>
          <div>
            <p className="text-sm font-bold text-blue-700">Hidratación</p>
            <p className="text-xs text-blue-600 mt-1 leading-relaxed">
              Durante la fase {pc.name.toLowerCase()}, mantén una ingesta de 2–2.5 L de agua al día. Las infusiones de jengibre y menta también son excelentes aliadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
