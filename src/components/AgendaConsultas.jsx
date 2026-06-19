import React, { useState } from 'react'
import { appointments } from '../data/sampleData'

const MONTH_NAMES_SHORT = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]

const SPECIALTY_ICONS = {
  'Ginecóloga': '👩‍⚕️',
  'Nutricionista': '🥗',
  'Laboratorio': '🧪',
}

function AppointmentCard({ appt, isNext }) {
  const date = new Date(appt.date + 'T' + appt.time)
  const dayNum = date.getDate()
  const monthStr = MONTH_NAMES_SHORT[date.getMonth()]
  const icon = SPECIALTY_ICONS[appt.specialty] || '📋'

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm"
      style={{
        border: isNext ? `2px solid ${appt.phaseColor}` : '1px solid #F3F4F6',
        backgroundColor: 'white',
      }}
    >
      {isNext && (
        <div
          className="px-4 py-1.5 text-xs font-bold text-center"
          style={{ backgroundColor: appt.phaseColor, color: 'white' }}
        >
          Próxima cita
        </div>
      )}
      <div className="flex gap-3 p-4">
        {/* Date */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center"
          style={{ backgroundColor: appt.phaseBg }}
        >
          <span className="text-xl font-extrabold leading-none" style={{ color: appt.phaseColor }}>
            {dayNum}
          </span>
          <span className="text-[10px] font-bold uppercase" style={{ color: appt.phaseColor, opacity: 0.8 }}>
            {monthStr}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold text-gray-800 leading-tight">{appt.title}</p>
            <span
              className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={
                appt.modality === 'online'
                  ? { backgroundColor: '#E0F2FE', color: '#0369A1' }
                  : { backgroundColor: '#F0FDF4', color: '#166534' }
              }
            >
              {appt.modality === 'online' ? '🌐 Online' : '📍 Presencial'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-sm">{icon}</span>
            <p className="text-xs font-semibold text-gray-600">{appt.professional}</p>
          </div>
          <p className="text-xs text-gray-400 mt-1 truncate">
            🕐 {appt.time} · {appt.location}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AgendaConsultas({ cycleInfo }) {
  const pc = cycleInfo.phaseConfig
  const [showForm, setShowForm] = useState(false)

  const today = new Date()

  const upcoming = appointments
    .filter((a) => new Date(a.date + 'T' + a.time) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  const past = appointments
    .filter((a) => new Date(a.date + 'T' + a.time) < today)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="p-4 space-y-4 pb-6">

      {/* Header */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: pc.bgColor }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold" style={{ color: pc.textColor }}>
              Agenda de consultas
            </p>
            <p className="text-xs opacity-70 mt-0.5" style={{ color: pc.textColor }}>
              {upcoming.length} cita{upcoming.length !== 1 ? 's' : ''} próxima{upcoming.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${pc.textColor}18` }}
          >
            📋
          </div>
        </div>
      </div>

      {/* Upcoming appointments */}
      {upcoming.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
            Próximas citas
          </p>
          {upcoming.map((appt, i) => (
            <AppointmentCard key={appt.id} appt={appt} isNext={i === 0} />
          ))}
        </div>
      )}

      {/* Past appointments */}
      {past.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
            Historial
          </p>
          {past.map((appt) => (
            <div key={appt.id} className="opacity-50">
              <AppointmentCard appt={appt} isNext={false} />
            </div>
          ))}
        </div>
      )}

      {/* Add appointment form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border" style={{ borderColor: pc.accentColor }}>
          <p className="text-sm font-bold text-gray-800 mb-3">Nueva cita</p>
          <div className="space-y-3">
            {[
              { label: 'Título', placeholder: 'Revisión ginecológica…', type: 'text' },
              { label: 'Profesional', placeholder: 'Dra. García…', type: 'text' },
              { label: 'Fecha', placeholder: '', type: 'date' },
              { label: 'Hora', placeholder: '', type: 'time' },
            ].map(({ label, placeholder, type }) => (
              <div key={label}>
                <label className="text-xs font-semibold text-gray-500 block mb-1">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  className="w-full text-sm text-gray-700 border rounded-xl px-3 py-2 outline-none"
                  style={{ borderColor: '#E5E7EB' }}
                  onFocus={(e) => (e.target.style.borderColor = pc.textColor)}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Modalidad</label>
              <div className="flex gap-2">
                {['Presencial', 'Online'].map((m) => (
                  <button
                    key={m}
                    className="flex-1 text-xs font-semibold py-2 rounded-xl border transition-all"
                    style={{ borderColor: pc.textColor, color: pc.textColor }}
                  >
                    {m === 'Presencial' ? '📍 ' : '🌐 '}{m}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 text-sm font-semibold py-2.5 rounded-xl border border-gray-200 text-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 text-sm font-bold py-2.5 rounded-xl text-white"
                style={{ backgroundColor: pc.textColor }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{
            backgroundColor: pc.textColor,
            color: 'white',
            boxShadow: `0 4px 16px ${pc.textColor}40`,
          }}
        >
          <span className="text-lg">+</span>
          Agregar nueva cita
        </button>
      )}
    </div>
  )
}
