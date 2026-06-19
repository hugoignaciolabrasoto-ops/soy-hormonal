import React from 'react'

const CalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <circle cx="8" cy="15" r="1.2" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="15" r="1.2" fill="currentColor" stroke="none"/>
  </svg>
)

const HeartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l7.84 7.84 7.84-7.84a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const LeafIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22 C2 22 8 16 12 12"/>
    <path d="M21 3C21 3 21 13 12 12C3 11 3 3 12 3C18 3 21 3 21 3Z"/>
  </svg>
)

const ClipIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="16" x2="13" y2="16"/>
  </svg>
)

const BoltIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const TABS = [
  { id: 'calendario',    label: 'Ciclo',     Icon: CalIcon },
  { id: 'sintomas',      label: 'Síntomas',  Icon: HeartIcon },
  { id: 'nutricion',     label: 'Nutrición', Icon: LeafIcon },
  { id: 'consultas',     label: 'Citas',     Icon: ClipIcon },
  { id: 'entrenamiento', label: 'Entreno',   Icon: BoltIcon },
]

export default function BottomNav({ activeTab, setActiveTab, cycleInfo }) {
  const { textColor } = cycleInfo.phaseConfig

  return (
    <nav
      className="flex-shrink-0 flex items-center justify-around"
      style={{
        backgroundColor: 'white',
        borderTop: '1px solid #F0EBF5',
        paddingBottom: 'env(safe-area-inset-bottom)',
        minHeight: '64px',
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const active = activeTab === id
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex flex-col items-center gap-0.5 flex-1 py-2 transition-all"
            style={{ color: active ? textColor : '#9CA3AF' }}
          >
            <div
              className="p-1.5 rounded-xl transition-all"
              style={{
                backgroundColor: active ? `${textColor}18` : 'transparent',
              }}
            >
              <Icon />
            </div>
            <span
              className="text-[10px] font-semibold leading-none"
              style={{ color: active ? textColor : '#9CA3AF' }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
