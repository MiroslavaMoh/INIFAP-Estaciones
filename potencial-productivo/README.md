# Dashboard de Estaciones Meteorológicas

Prototipo de dashboard para visualizar datos en tiempo real de estaciones meteorológicas (temperatura, humedad, precipitación, radiación y viento). Construido con React + Vite.

## Requisitos

- Node.js 18+
- npm

## Instalación y ejecución

```bash
npm install
npm run dev
```

Otros scripts disponibles:

```bash
npm run build    # build de producción
npm run preview  # sirve el build de producción localmente
npm run lint     # ejecuta ESLint
```

## Estado actual de los datos

⚠️ **Este prototipo no está conectado a ninguna API ni base de datos todavía.** Todos los valores que se ven en pantalla son datos de ejemplo (mock) escritos directamente en el código. El objetivo de esta sección es explicar **dónde vive cada dato** y **qué forma debe tener** para reemplazarlo por datos reales.

### 1. Datos de la estación y métricas (`src/App.jsx`)

En [App.jsx](src/App.jsx) están escritos a mano:

- El objeto `selectedStation` (nombre, ubicación) — línea ~17.
- Los valores de cada `MetricCard` (temperatura, humedad, precipitación, radiación, viento) — pasados como props `Number`, `Value`, etc.

Para cargar datos reales, la forma más directa es reemplazar estos literales por estado (`useState`) que se llene desde un `fetch`/`axios` a tu API en un `useEffect`, o mediante props si el dashboard recibe los datos de un componente padre. La estructura mínima que espera cada `MetricCard` es un número actual más, opcionalmente, un máximo y un mínimo con su hora de ocurrencia (ver los bloques `statBox` dentro de `App.jsx`).

### 2. Lista de estaciones (`src/components/StationSelectorModal.jsx`)

El arreglo `mockStations` (línea 15) define las estaciones disponibles para el selector y el mapa:

```js
{ id: 1, name: 'Marianita', location: 'Mazapil', lat: 24.11, lng: -102.09, active: true }
```

Para usar datos reales, sustituye `mockStations` por el resultado de una petición a tu servicio de estaciones (mismo `id/name/location/lat/lng/active`), idealmente cargado en un `useEffect` al montar el modal.

### 3. Gráfica histórica de 24 hrs (`src/components/Grafica.jsx`) — ⭐ foco principal

Este es el componente que más probablemente necesites conectar a datos reales primero, ya que es el que se probará al integrarlo con la infraestructura del backend/base de datos de estaciones.

Actualmente, `Grafica.jsx` **genera sus propios datos falsos** dentro de un `useMemo` (líneas 6-20) usando `Math.sin` y `Math.random` para simular curvas de temperatura y humedad a lo largo de 24 horas. Esto es lo primero que debe eliminarse al conectar datos reales.

**Contrato de datos que espera la gráfica:**

La gráfica se dibuja a partir de un arreglo de exactamente esta forma (uno por hora, 24 elementos idealmente, uno por cada hora del día):

```js
[
  { hour: "00:00", temp: 18.4, humidity: 62.1, precip: 0 },
  { hour: "01:00", temp: 17.9, humidity: 64.0, precip: 0 },
  // ...
  { hour: "23:00", temp: 19.2, humidity: 58.5, precip: 0.3 },
]
```

| Campo      | Tipo   | Unidad | Descripción                                   |
|------------|--------|--------|------------------------------------------------|
| `hour`     | string | —      | Etiqueta de hora en formato `HH:00`            |
| `temp`     | number | °C     | Temperatura (se grafica sobre una escala de 0–40°C, ver `getTempY`) |
| `humidity` | number | %      | Humedad relativa (escala 0–100%, ver `getHumY`) |
| `precip`   | number | mm     | Precipitación acumulada de esa hora (barras, escala 0–5 mm, ver `getPrecipHeight`) |

**Pasos para conectar datos reales:**

1. Reemplaza el `useMemo` que genera `mockChartData` por un `useState([])` + `useEffect` que haga `fetch` al endpoint que devuelva el histórico de 24 hrs de la estación seleccionada, y guarde el resultado ya transformado a la forma de arriba.
2. Si tu API tiene una escala distinta a 0–40°C, 0–100% o 0–5mm de precipitación, ajusta las constantes `maxBarHeight`/`maxPrecip` y las funciones `getTempY`/`getHumY`/`getPrecipHeight` (líneas 22-31) para que la escala coincida con tus datos reales; de lo contrario la curva se verá recortada o aplanada.
3. El componente recibe hoy 0 props — si vas a mostrar el histórico de la estación seleccionada en `App.jsx`, necesitas pasarle el `id` de la estación (o los datos ya cargados) como prop desde `App.jsx`, por ejemplo `<Grafica stationId={selectedStation.id} />`.
4. Mientras no haya datos (loading) o si la API falla, considera mostrar un estado vacío/skeleton en vez de dejar el arreglo vacío, ya que actualmente el componente asume que siempre hay 24 elementos (por ejemplo, las etiquetas del eje X acceden directamente a `mockChartData[hourIndex]`).

Nota: el proyecto ya incluye [`recharts`](https://recharts.org/) como dependencia, pero `Grafica.jsx` actualmente dibuja la gráfica a mano con SVG (paths, líneas de cuadrícula, tooltips) en vez de usar esa librería. Si prefieres simplificar el componente al conectar datos reales, es una opción migrar esta gráfica a `recharts` en vez de mantener el SVG manual.

## Estructura del proyecto

```
src/
├── App.jsx                        # Layout principal del dashboard
├── components/
│   ├── Grafica.jsx                # Gráfica histórica de 24 hrs (temp/humedad/precipitación)
│   ├── MetricCard.jsx             # Tarjeta contenedora de cada métrica
│   ├── NumberData.jsx             # Valor numérico grande + unidad
│   ├── DetailsIconLeft.jsx        # Fila de detalle con ícono
│   └── StationSelectorModal.jsx   # Modal de selección de estación (con mapa Leaflet)
```
