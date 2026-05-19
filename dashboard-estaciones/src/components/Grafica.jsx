import React, { useState, useMemo } from 'react';

const Grafica = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const mockChartData = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const temp = 15 + Math.sin((i - 8) / 12 * Math.PI) * 12 + Math.random() * 2;
      const humidity = 80 - Math.sin((i - 8) / 12 * Math.PI) * 40 + Math.random() * 5;
      const precip = (i >= 6 && i <= 8) ? Math.random() * 2 :
                     (i >= 14 && i <= 16) ? Math.random() * 3.5 :
                     Math.random() < 0.1 ? Math.random() * 0.5 : 0;
      return {
        hour: `${i.toString().padStart(2, '0')}:00`,
        temp: Math.max(0, temp),
        humidity: Math.max(0, Math.min(100, humidity)),
        precip: Math.round(precip * 10) / 10
      };
    });
  }, []);

  const chartWidth = 800;
  const chartHeight = 150;
  const maxBarHeight = 45;
  const maxPrecip = 5;
  const barWidth = chartWidth / mockChartData.length;

  const getX = (index) => (index / (mockChartData.length - 1)) * chartWidth;
  const getTempY = (temp) => chartHeight - (temp / 40) * chartHeight;
  const getHumY = (hum) => chartHeight - (hum / 100) * chartHeight;
  const getPrecipHeight = (precip) => (precip / maxPrecip) * maxBarHeight;

  const tempPath = mockChartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getTempY(d.temp)}`).join(' ');
  const humPath = mockChartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getHumY(d.humidity)}`).join(' ');
  const humAreaPath = `${humPath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <svg
      viewBox="0 -10 800 210"
      className="w-full h-full overflow-visible"
      preserveAspectRatio="none"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Líneas de cuadrícula */}
      {[0, 1, 2, 3].map(step => {
        const y = chartHeight - (step / 3) * chartHeight;
        return <line key={step} x1="0" y1={y} x2={chartWidth} y2={y} stroke="#f3f4f6" strokeWidth="1" />;
      })}

      {/* Barras de precipitación */}
      {mockChartData.map((d, i) => {
        const h = getPrecipHeight(d.precip);
        if (h <= 0) return null;
        return (
          <g key={`precip-${i}`}>
            <rect
              x={getX(i) - barWidth / 2 + 1}
              y={chartHeight - h}
              width={barWidth - 2}
              height={h}
              fill="rgba(14, 165, 233, 0.45)"
              rx="2"
            />
            <text
              x={getX(i)}
              y={chartHeight - h - 4}
              fontSize="9"
              fill="#0ea5e9"
              textAnchor="middle"
              fontWeight="bold"
            >
              {d.precip}mm
            </text>
          </g>
        );
      })}

      {/* Área y líneas de humedad y temperatura */}
      <path d={humAreaPath} fill="rgba(59, 130, 246, 0.05)" />
      <path d={humPath} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
      <path d={tempPath} fill="none" stroke="#D4C19C" strokeWidth="3" />

      {/* Etiquetas eje X */}
      {[0, 4, 8, 12, 16, 20].map(hourIndex => (
        <text
          key={hourIndex}
          x={getX(hourIndex)}
          y={chartHeight + 25}
          fontSize="11"
          fill="#9ca3af"
          textAnchor="middle"
        >
          {mockChartData[hourIndex].hour}
        </text>
      ))}

      {/* Zonas de hover */}
      {mockChartData.map((_, i) => (
        <rect
          key={`hover-zone-${i}`}
          x={getX(i) - barWidth / 2}
          y={0}
          width={barWidth}
          height={chartHeight}
          fill="transparent"
          onMouseEnter={() => setHoveredIndex(i)}
          style={{ cursor: 'crosshair', pointerEvents: 'all' }}
        />
      ))}

      {/* Tooltip */}
      {hoveredIndex !== null && (
        <g style={{ pointerEvents: 'none' }}>
          <line
            x1={getX(hoveredIndex)}
            y1={0}
            x2={getX(hoveredIndex)}
            y2={chartHeight}
            stroke="#9ca3af"
            strokeDasharray="4"
            strokeWidth="1.5"
          />
          <circle cx={getX(hoveredIndex)} cy={getTempY(mockChartData[hoveredIndex].temp)} r="5" fill="white" stroke="#D4C19C" strokeWidth="2.5" />
          <circle cx={getX(hoveredIndex)} cy={getHumY(mockChartData[hoveredIndex].humidity)} r="5" fill="white" stroke="#3b82f6" strokeWidth="2.5" />

          <g transform={`translate(${getX(hoveredIndex) > chartWidth / 2 ? getX(hoveredIndex) - 145 : getX(hoveredIndex) + 15}, 10)`}>
            <rect x="0" y="0" width="130" height="92" fill="white" stroke="#e5e7eb" strokeWidth="1" rx="6" filter="drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))" />
            <text x="15" y="24" fontSize="13" fontWeight="bold" fill="#10312B">
              {mockChartData[hoveredIndex].hour} hrs
            </text>
            <text x="15" y="44" fontSize="12" fill="#6b7280">
              Temp: <tspan fill="#B38E5D" fontWeight="bold">{mockChartData[hoveredIndex].temp.toFixed(1)}°C</tspan>
            </text>
            <text x="15" y="62" fontSize="12" fill="#6b7280">
              Hum: <tspan fill="#3b82f6" fontWeight="bold">{mockChartData[hoveredIndex].humidity.toFixed(1)}%</tspan>
            </text>
            <text x="15" y="80" fontSize="12" fill="#6b7280">
              Prec: <tspan fill="#0ea5e9" fontWeight="bold">{mockChartData[hoveredIndex].precip.toFixed(1)} mm</tspan>
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};

export default Grafica;
