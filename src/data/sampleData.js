export const LAST_PERIOD_START = '2026-06-06'

export const cycleHistory = [
  { id: 1, startDate: '2026-04-11' },
  { id: 2, startDate: '2026-05-09' },
  { id: 3, startDate: '2026-06-06' },
]

export const todayMetrics = {
  energy: 82,
  weight: 58.3,
  sleep: 7.5,
  water: 1.8,
}

export const weeklyEnergy = [
  { day: 'L', value: 62 },
  { day: 'M', value: 68 },
  { day: 'X', value: 74 },
  { day: 'J', value: 77 },
  { day: 'V', value: 80 },
  { day: 'S', value: 85 },
  { day: 'D', value: 82 },
]

export const initialMood = 4

export const initialSymptoms = [
  { id: 'retencion',  label: 'Retención',       value: 2, icon: '💧' },
  { id: 'claridad',   label: 'Claridad mental',  value: 8, icon: '🧠' },
  { id: 'fatiga',     label: 'Fatiga',           value: 3, icon: '😴' },
  { id: 'libido',     label: 'Libido',           value: 8, icon: '💕' },
  { id: 'dolor',      label: 'Dolor pélvico',    value: 1, icon: '🌡️' },
  { id: 'ansiedad',   label: 'Ansiedad',         value: 2, icon: '🌪️' },
]

export const nutritionByPhase = {
  menstrual: {
    focus: 'Hierro, magnesio y antiinflamatorios',
    tip: 'Tu cuerpo necesita recuperar el hierro perdido. Apóyate en alimentos cálidos y de fácil digestión.',
    recommended: [
      { name: 'Lentejas',       macros: ['Hierro', 'Proteína'],     icon: '🫘' },
      { name: 'Espinaca',       macros: ['Hierro', 'Magnesio'],     icon: '🥬' },
      { name: 'Chocolate 70%',  macros: ['Magnesio', 'Antioxid.'],  icon: '🍫' },
      { name: 'Salmón',         macros: ['Omega-3', 'Proteína'],    icon: '🐟' },
      { name: 'Jengibre',       macros: ['Antiinflam.', 'Calor'],   icon: '🫚' },
      { name: 'Frambuesas',     macros: ['Vitamina C', 'Fibra'],    icon: '🍇' },
    ],
    avoid: ['Alcohol', 'Sal excesiva', 'Cafeína', 'Azúcar refinada', 'Lácteos'],
  },
  folicular: {
    focus: 'Estrógenos, energía y detoxificación',
    tip: 'Los estrógenos suben gradualmente. Favorece alimentos que ayuden a su metabolismo saludable.',
    recommended: [
      { name: 'Brócoli',        macros: ['Fibra', 'Vitamina C'],    icon: '🥦' },
      { name: 'Huevos',         macros: ['Proteína', 'Colina'],     icon: '🥚' },
      { name: 'Quinoa',         macros: ['Proteína', 'Hierro'],     icon: '🌾' },
      { name: 'Aguacate',       macros: ['Grasas buenas', 'K'],     icon: '🥑' },
      { name: 'Semillas lino',  macros: ['Omega-3', 'Lignanos'],    icon: '🌱' },
      { name: 'Zanahorias',     macros: ['Beta-caroteno', 'Fibra'], icon: '🥕' },
    ],
    avoid: ['Alcohol', 'Comida procesada', 'Grasas trans', 'Exceso de azúcar'],
  },
  ovulatoria: {
    focus: 'Antioxidantes, zinc y fibra',
    tip: 'Es tu mejor momento. Aliméntate con colores vivos para apoyar la ovulación y tu nivel de energía.',
    recommended: [
      { name: 'Pimiento rojo',  macros: ['Vitamina C', 'Antioxid.'], icon: '🫑' },
      { name: 'Fresas',         macros: ['Vitamina C', 'Fibra'],     icon: '🍓' },
      { name: 'Pollo',          macros: ['Proteína', 'Zinc'],        icon: '🍗' },
      { name: 'Espárragos',     macros: ['Folato', 'Vitamina K'],    icon: '🌿' },
      { name: 'Nueces',         macros: ['Omega-3', 'Vitamina E'],   icon: '🥜' },
      { name: 'Tomate',         macros: ['Licopeno', 'Vitamina C'],  icon: '🍅' },
    ],
    avoid: ['Soja en exceso', 'Alcohol', 'Azúcar', 'Cafeína en exceso'],
  },
  lutea: {
    focus: 'Progesterona, magnesio y triptófano',
    tip: 'El magnesio reduce los antojos y la retención. Prioriza alimentos que apoyen tu estado de ánimo.',
    recommended: [
      { name: 'Batata',           macros: ['Vitamina B6', 'K'],      icon: '🍠' },
      { name: 'Almendras',        macros: ['Magnesio', 'Vitamina E'], icon: '🥜' },
      { name: 'Plátano',          macros: ['Potasio', 'B6'],         icon: '🍌' },
      { name: 'Legumbres',        macros: ['Fibra', 'Proteína'],     icon: '🫘' },
      { name: 'Pavo',             macros: ['Triptófano', 'Proteína'], icon: '🍖' },
      { name: 'Semillas girasol', macros: ['Magnesio', 'Zinc'],      icon: '🌻' },
    ],
    avoid: ['Cafeína', 'Alcohol', 'Sal', 'Azúcar refinada', 'Gluten en exceso'],
  },
}

export const appointments = [
  {
    id: 1,
    title: 'Revisión ginecológica',
    professional: 'Dra. Ana Martínez',
    specialty: 'Ginecóloga',
    date: '2026-06-25',
    time: '10:30',
    modality: 'presencial',
    location: 'Clínica Salud Mujer',
    phaseColor: '#A32D2D',
    phaseBg: '#FCEBEB',
  },
  {
    id: 2,
    title: 'Consulta nutricional hormonal',
    professional: 'Lic. Carmen Vega',
    specialty: 'Nutricionista',
    date: '2026-06-28',
    time: '17:00',
    modality: 'online',
    location: 'Videollamada · Google Meet',
    phaseColor: '#185FA5',
    phaseBg: '#E6F1FB',
  },
  {
    id: 3,
    title: 'Panel hormonal completo',
    professional: 'Lab. BioSalud',
    specialty: 'Laboratorio',
    date: '2026-07-02',
    time: '08:00',
    modality: 'presencial',
    location: 'Laboratorio Central · Av. Principal 42',
    phaseColor: '#BA7517',
    phaseBg: '#FAEEDA',
  },
  {
    id: 4,
    title: 'Seguimiento hormonal',
    professional: 'Dra. Ana Martínez',
    specialty: 'Ginecóloga',
    date: '2026-07-15',
    time: '11:00',
    modality: 'online',
    location: 'Videollamada · Zoom',
    phaseColor: '#534AB7',
    phaseBg: '#EEEDFE',
  },
]

export const trainingByPhase = {
  menstrual: {
    intensity: 2,
    type: 'Movimiento suave y restaurativo',
    subtitle: 'Escucha tu cuerpo — el descanso es productivo',
    exercises: [
      { name: 'Yoga restaurativo',           sets: '1 sesión', reps: '25 min', intensity: 2 },
      { name: 'Caminata consciente',         sets: '1 sesión', reps: '30 min', intensity: 2 },
      { name: 'Estiramientos de cadera',     sets: '3 series', reps: '60 seg', intensity: 1 },
      { name: 'Respiración diafragmática',   sets: '1 sesión', reps: '10 min', intensity: 1 },
    ],
    nextPhaseInsight: '🌱 Fase folicular en camino — podrás aumentar la intensidad con cardio y fuerza progresiva.',
  },
  folicular: {
    intensity: 6,
    type: 'Cardio y fuerza moderada',
    subtitle: 'Tu energía crece — úsala con intención',
    exercises: [
      { name: 'Sentadillas',         sets: '3 series', reps: '12 reps', intensity: 6 },
      { name: 'Carrera en intervalos', sets: '5 series', reps: '3 min',  intensity: 7 },
      { name: 'Peso muerto',         sets: '3 series', reps: '10 reps', intensity: 6 },
      { name: 'Plancha frontal',     sets: '3 series', reps: '45 seg',  intensity: 5 },
    ],
    nextPhaseInsight: '✨ Fase ovulatoria próxima — es tu ventana de rendimiento máximo. ¡Prepárate!',
  },
  ovulatoria: {
    intensity: 9,
    type: 'Alta intensidad y fuerza máxima',
    subtitle: 'Estás en tu pico — exprime cada entrenamiento',
    exercises: [
      { name: 'HIIT full body',   sets: '4 rondas',  reps: '20 min', intensity: 9 },
      { name: 'Press de banca',   sets: '4 series',  reps: '8 reps', intensity: 8 },
      { name: 'Burpees',          sets: '4 series',  reps: '15 reps', intensity: 9 },
      { name: 'Sprint 200m',      sets: '6 series',  reps: '200 m',  intensity: 10 },
    ],
    nextPhaseInsight: '🍂 Fase lútea próxima — ve bajando la intensidad gradualmente. Tu cuerpo te lo agradecerá.',
  },
  lutea: {
    intensity: 5,
    type: 'Fuerza moderada y mindful movement',
    subtitle: 'Mantén el movimiento, honra tu sensibilidad',
    exercises: [
      { name: 'Pilates reformer',       sets: '1 sesión', reps: '40 min', intensity: 5 },
      { name: 'Sentadillas sumo',       sets: '3 series', reps: '10 reps', intensity: 5 },
      { name: 'Bicicleta estática',     sets: '1 sesión', reps: '25 min', intensity: 4 },
      { name: 'Yoga activo (vinyasa)',  sets: '1 sesión', reps: '30 min', intensity: 4 },
    ],
    nextPhaseInsight: '🌙 La menstruación se aproxima — prepara tu cuerpo con descanso, calor y nutrición consciente.',
  },
}
