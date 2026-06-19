# Soy Hormonal

Plataforma de salud hormonal femenina — React + Vite + TailwindCSS.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Build de producción

```bash
npm run build
npm run preview   # previsualizar el build
```

---

## Deploy en Render

1. Crea una cuenta en [render.com](https://render.com)
2. Haz clic en **New → Static Site**
3. Conecta tu repositorio de GitHub
4. Configura los campos:

| Campo | Valor |
|---|---|
| **Build Command** | `npm install && npm run build` |
| **Publish directory** | `dist` |

5. En la sección **Redirects/Rewrites**, añade la regla:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`

6. Haz clic en **Create Static Site** → Render desplegará automáticamente.

---

## Deploy en Vercel

El archivo `vercel.json` ya está incluido para manejar el enrutamiento SPA.

```bash
# Con Vercel CLI
npm i -g vercel
vercel
```

O importa el repositorio desde [vercel.com/new](https://vercel.com/new). Vercel detecta Vite automáticamente.

---

## Estructura del proyecto

```
src/
  components/
    BottomNav.jsx           — Navegación inferior de 5 pestañas
    CalendarioHormonal.jsx  — Calendario del ciclo + métricas
    SeguimientoSintomas.jsx — Estado de ánimo + síntomas + gráfico
    BibliotecaNutricion.jsx — Nutrición adaptada a la fase
    AgendaConsultas.jsx     — Citas médicas
    AreaEntrenamiento.jsx   — Rutina adaptada a la fase
  data/
    sampleData.js           — Datos de ejemplo
  utils/
    cycleAlgorithm.js       — Cálculo matemático del ciclo
    phaseConfig.js          — Colores y metadata de fases
  App.jsx
  main.jsx
  index.css
```
