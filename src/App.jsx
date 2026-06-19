import React, { useState, useMemo } from 'react'
import { LAST_PERIOD_START, cycleHistory } from './data/sampleData'
import {
  getDayOfCycle,
  getCurrentPhase,
  getAverageCycleLength,
  getNextPeriodDate,
  getDaysUntil,
} from './utils/cycleAlgorithm'
import { PHASES } from './utils/phaseConfig'
import BottomNav from './components/BottomNav'
import CalendarioHormonal from './components/CalendarioHormonal'
import SeguimientoSintomas from './components/SeguimientoSintomas'
import BibliotecaNutricion from './components/BibliotecaNutricion'
import AgendaConsultas from './components/AgendaConsultas'
import AreaEntrenamiento from './components/AreaEntrenamiento'

export default function App() {
  const [activeTab, setActiveTab] = useState('calendario')

  const cycleInfo = useMemo(() => {
    const dayOfCycle = getDayOfCycle(LAST_PERIOD_START)
    const phase = getCurrentPhase(dayOfCycle)
    const avgCycleLength = getAverageCycleLength(cycleHistory)
    const nextPeriodDate = getNextPeriodDate(LAST_PERIOD_START, avgCycleLength)
    const daysUntilNextPeriod = getDaysUntil(nextPeriodDate)
    const phaseConfig = PHASES[phase]

    return {
      dayOfCycle,
      phase,
      phaseConfig,
      avgCycleLength,
      nextPeriodDate,
      daysUntilNextPeriod,
      lastPeriodStart: LAST_PERIOD_START,
    }
  }, [])

  const pc = cycleInfo.phaseConfig

  const sections = {
    calendario:    <CalendarioHormonal cycleInfo={cycleInfo} />,
    sintomas:      <SeguimientoSintomas cycleInfo={cycleInfo} />,
    nutricion:     <BibliotecaNutricion cycleInfo={cycleInfo} />,
    consultas:     <AgendaConsultas cycleInfo={cycleInfo} />,
    entrenamiento: <AreaEntrenamiento cycleInfo={cycleInfo} />,
  }

  return (
    <div
      className="flex flex-col mx-auto shadow-2xl"
      style={{
        height: '100dvh',
        minHeight: '100vh',
        maxWidth: '480px',
        backgroundColor: '#FDF8F8',
      }}
    >
      {/* Header */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-5 py-3"
        style={{
          backgroundColor: pc.bgColor,
          borderBottom: `1px solid ${pc.accentColor}60`,
          minHeight: '60px',
        }}
      >
        <div>
          <h1
            className="text-lg font-bold tracking-tight leading-tight"
            style={{ color: pc.textColor }}
          >
            Soy Hormonal
          </h1>
          <p className="text-xs font-medium opacity-60" style={{ color: pc.textColor }}>
            Día {cycleInfo.dayOfCycle} · ciclo de {cycleInfo.avgCycleLength} días
          </p>
        </div>

        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ backgroundColor: pc.textColor, color: 'white' }}
        >
          <span className="text-sm">{pc.emoji}</span>
          <span>Fase {pc.name}</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {sections[activeTab]}
      </main>

      {/* Bottom nav */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} cycleInfo={cycleInfo} />
    </div>
  )
}
