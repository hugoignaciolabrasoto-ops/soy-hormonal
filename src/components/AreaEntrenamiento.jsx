import React, { useState } from 'react'
import { trainingByPhase } from '../data/sampleData'
import { PHASES } from '../utils/phaseConfig'

function IntensityBar({ value, max = 10, color }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className="h-2.5 flex-1 rounded-full transition-all"
          style={{
            backgroundColor: i < value ? color : `${color}20`,
          }}
        />
      ))}
    </div>
  )
}

function ExerciseCard({ exercise, phaseColor, index }) {
  const [done, setDone] = useState(false)

  return (
    <div
      className="rounded-xl p-3 transition-all"
      style={{
        backgroundColor: done ? `${phaseColor}10` : '#F9FAFB',
        border: done ? `1.5px solid ${phaseColor}40` : '1.5px solid transparent',
      }}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => setDone(!done)}
          className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all"
          style={{
            borderColor: done ? phaseColor : '#D1D5DB',
            backgroundColor: done ? phaseColor : 'white',
          }}
        >
          {done && <span className="text-white text-xs font-bold">✓</span>}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p
              className="text-sm font-bold"
              style={{
                color: done ? phaseColor : '#1F2937',
                textDecoration: done ? 'line-through' : 'none',
                opacity: done ? 0.7 : 1,
              }}
            >
              {exercise.name}
            </p>
            <span
              className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{ backgroundColor: `${phaseColor}18`, color: phaseColor }}
            >
              {exercise.sets}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1">
            <p className="text-xs text-gray-500 font-medium">{exercise.reps}</p>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>Intensidad</span>
              <span>{exercise.intensity}/10</span>
            </div>
            <IntensityBar value={exercise.intensity} color={phaseColor} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AreaEntrenamiento({ cycleInfo }) {
  const pc = cycleInfo.phaseConfig
  const training = trainingByPhase[cycleInfo.phase]

  const intensityLabel =
    training.intensity <= 3 ? 'Baja' :
    training.intensity <= 5 ? 'Moderada' :
    training.intensity <= 7 ? 'Alta' : 'Máxima'

  const intensityEmoji =
    training.intensity <= 3 ? '🌊' :
    training.intensity <= 5 ? '🔥' :
    training.intensity <= 7 ? '💪' : '⚡'

  return (
    <div className="p-4 space-y-4 pb-6">

      {/* Header */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: pc.bgColor }}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{intensityEmoji}</span>
              <p className="text-base font-bold" style={{ color: pc.textColor }}>
                Entreno de hoy
              </p>
            </div>
            <p className="text-sm font-semibold" style={{ color: pc.textColor, opacity: 0.85 }}>
              {training.type}
            </p>
            <p className="text-xs mt-1" style={{ color: pc.textColor, opacity: 0.65 }}>
              {training.subtitle}
            </p>
          </div>
          <div
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-white ml-3"
            style={{ backgroundColor: pc.textColor }}
          >
            {training.exercises.length} ejercicios
          </div>
        </div>

        {/* Intensity */}
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${pc.textColor}12` }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold" style={{ color: pc.textColor }}>
              Intensidad global
            </span>
            <span className="text-xs font-bold" style={{ color: pc.textColor }}>
              {intensityLabel} · {training.intensity}/10
            </span>
          </div>
          <IntensityBar value={training.intensity} color={pc.textColor} />
        </div>
      </div>

      {/* Phase comparison */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Intensidad por fase
        </p>
        <div className="space-y-2">
          {Object.entries(trainingByPhase).map(([phase, data]) => {
            const p = PHASES[phase]
            const isActive = phase === cycleInfo.phase
            return (
              <div key={phase} className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 w-24 flex-shrink-0">
                  <span className="text-sm">{p.emoji}</span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: isActive ? p.textColor : '#9CA3AF' }}
                  >
                    {p.name}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-2 flex-1 rounded-full"
                        style={{
                          backgroundColor: i < data.intensity
                            ? (isActive ? p.textColor : `${p.textColor}50`)
                            : '#F3F4F6',
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span
                  className="text-xs font-bold w-4 text-right"
                  style={{ color: isActive ? p.textColor : '#9CA3AF' }}
                >
                  {data.intensity}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Exercises */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Rutina del día
        </p>
        <div className="space-y-3">
          {training.exercises.map((exercise, i) => (
            <ExerciseCard
              key={exercise.name}
              exercise={exercise}
              phaseColor={pc.textColor}
              index={i}
            />
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-3 text-center">
          Toca el círculo para marcar un ejercicio como completado
        </p>
      </div>

      {/* Next phase insight */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: `linear-gradient(135deg, ${pc.bgColor}, white)`,
          border: `1px solid ${pc.accentColor}60`,
        }}
      >
        <div className="flex gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ backgroundColor: pc.textColor }}
          >
            <span className="text-white text-base">💡</span>
          </div>
          <div>
            <p className="text-xs font-bold mb-1" style={{ color: pc.textColor }}>
              Consejo para la próxima fase
            </p>
            <p className="text-xs leading-relaxed text-gray-600">
              {training.nextPhaseInsight}
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Tips para la fase {pc.name.toLowerCase()}
        </p>
        <div className="space-y-2">
          {[
            { icon: '⏰', text: 'El mejor momento para entrenar es entre las 9–11 AM' },
            { icon: '🥤', text: 'Hidratación extra antes y después del entrenamiento' },
            { icon: '💆', text: 'Incluye al menos 10 min de estiramientos post-entreno' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-2">
              <span className="text-base flex-shrink-0">{icon}</span>
              <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
