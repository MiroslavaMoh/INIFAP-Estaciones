import './App.css'
import React, { useState, useMemo } from 'react';
import StationSelectorModal from './components/StationSelectorModal';
import DetailsIconLeft from './components/DetailsIconLeft';
import Grafica from './components/Grafica';
import AlertItem from './components/AlertItem';
import MetricCard from './components/MetricCard';
import NumberData from './components/NumberData';

// Iconos
import { 
  MapPin, 
  Clock, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  Sun, 
  Wind, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  AlertTriangle,
  BarChart2,
  Pin
} from 'lucide-react';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState({
    id: 1,
    name: 'Marianita',
    location: 'Mazapil'
  });

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    console.log('Estación seleccionada:', station);
  };

  return (
    
    <div className="min-h-screen font-sans text-gray-800">
      
      <div className="max-w-7xl mx-auto space-y-6 p-0 ">

        {/* Componente: Estacion */}
        <header className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          

          {/* Contenido principal en dos columnas */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-6">
            {/* Columna Izquierda */}
            <div>
              <div className="flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 ">
                {/* Etiqueta superior */}
                <div className="flex items-center gap-2 text-gray-500 mb-6 font-medium">
                  <MapPin size={18} className="text-[#9F2241]" />
                  <span>Tiempo real</span>
                </div>

                <h3 className="text-4xl sm:text-5xl font-bold text-[#10312B] tracking-tight text-left">{selectedStation.name}</h3>
                
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl sm:text-3xl text-gray-600 font-medium">{selectedStation.location}</h2>
                  
                </div>
                  <span className="text-gray-500 mb-6 font-medium">Fecha de Instalación: 08 Julio 2004</span>

              </div>
            </div>

            {/* Columna Derecha */}
            <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <Clock size={24} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 font-medium text-left">Última actualización:</p>
                  <p className="font-semibold text-[#10312B]">28 de Abril del 2026, 7:30 p.m.</p>
                </div>
              </div>

              {/*Componente: Boton*/}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#9F2241] hover:bg-[#691C32] transition-colors text-white font-semibold py-3 px-6 rounded-full shadow-md whitespace-nowrap w-full lg:w-auto"
              >
                Seleccionar estación
              </button>
            </div>
          </div>

        </header>

        {/* Fila 1: Métricas Principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Temperatura */}
          <MetricCard color="#9F2241" Icon={Thermometer} title="Temperatura">
            <NumberData Number="24.5" Value="°C" />
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-lg p-1 border border-gray-100">
                <div className="text-xs font-bold text-gray-400 mb-1 text-left">Máximo</div>
                <div className="font-semibold text-sm text-left">36.4°C</div>
                <div className="text-xs text-gray-400 text-left">16:15 pm</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-1 border border-gray-100">
                <div className="text-xs font-bold text-gray-400 mb-1 text-left">Mínimo</div>
                <div className="font-semibold text-sm text-left">36.4°C</div>
                <div className="text-xs text-gray-400 text-left">16:15 pm</div>
              </div>
            </div>
          </MetricCard>

          {/* Humedad */}
          <MetricCard color="#285C4D" Icon={Droplets} title="Humedad relativa">
            <NumberData Number="17.2" Value="%" />
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-lg p-1 border border-gray-100">
                <div className="text-xs font-bold text-gray-400 mb-1 text-left">Máximo</div>
                <div className="font-semibold text-sm text-left">36.4°C</div>
                <div className="text-xs text-gray-400 text-left">16:15 pm</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-1 border border-gray-100">
                <div className="text-xs font-bold text-gray-400 mb-1 text-left">Mínimo</div>
                <div className="font-semibold text-sm text-left">36.4°C</div>
                <div className="text-xs text-gray-400 text-left">16:15 pm</div>
              </div>
            </div>
          </MetricCard>

          {/* Precipitación */}
          <MetricCard color="#10312B" Icon={CloudRain} title="Precipitación">
            <NumberData Number="0.0" Value="mm" />
            <DetailsIconLeft IconDetail={ArrowUpRight} TitleDetail="Total acumulada" TextDetail="0.0mm" />
          </MetricCard>

          {/* Radiación */}
          <MetricCard color="#D4C19C" Icon={Sun} title="Radiación">
            <NumberData Number="0.0" Value="W/m²" />
            <DetailsIconLeft IconDetail={ArrowUpRight} TitleDetail="Total registrada" TextDetail="27,710 W/m²" />
          </MetricCard>

        </div>

        {/* Fila 2: Estado y Gráfica */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Componente: Detalles-mensaje*/}
          {/* Alerta */}
          <MetricCard color="#9F2241" Icon={AlertTriangle} title="Estado">
          
                <AlertItem type="condiciones" message="Ventana favorable baja deriva y temperatura estable." />
                <AlertItem type="alerta" message="Ráfagas de viento de 22.8 km/h registradas a las 01:30 PM." />
              
          </MetricCard>

          {/* Componente: Grafica*/}
          {/* Card Gráfica Interactiva */}
          <div className="lg:col-span-2">
            <MetricCard color="#9F2241" Icon={BarChart2} title="Histórico de 24 hrs">
            
              <div className="flex justify-between items-start mb-6">
                <div>
                  
                  <div className="flex gap-4 items-center mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <div className="w-3 h-3 rounded-full bg-[#D4C19C]"></div> Temperatura
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div> Humedad
                    </span>
                  </div>
                </div>
                <button className="bg-[#9F2241] hover:bg-[#691C32] transition-colors text-white font-medium py-2 px-5 rounded-full text-sm shadow-sm hidden sm:block">
                  Ver gráficas
                </button>
              </div>
              
              {/* Gráfica SVG */}
              <div className="flex-grow w-full mt-2 min-h-[200px] relative">
               <Grafica></Grafica>
              </div>
            
            </MetricCard>
          </div>
        </div>

        {/* Fila 3: Ubicación y Viento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Componente: Detalles-mensaje (variables: icono, titulo, contenido)*/}
          {/* Ubicación */}
          <div className="relative overflow-hidden h-full">
            <MetricCard color="#9F2241" Icon={MapPin} title="Ubicación">
             
                
                <div className="space-y-3">
                  <DetailsIconLeft
                    IconDetail={ArrowUpRight}
                    TitleDetail="Longitud"
                    TextDetail={`102° 9' 6.0"`}
                  />
                  <DetailsIconLeft
                    IconDetail={ArrowDownRight}
                    TitleDetail="Latitud"
                    TextDetail={`24° 11' 08.3"`}
                  />
                  <DetailsIconLeft
                    IconDetail={ArrowDownRight}
                    TitleDetail="Altitud"
                    TextDetail="1670 msnm."
                  />
                </div>
             
            </MetricCard>
          </div>

          {/* Componente: Detalles-maximo-minimo-media */}
          {/* Viento */}
          <div className="relative overflow-hidden lg:col-span-2 h-full">
            <MetricCard color="#7e7e7e" Icon={Wind} title="Velocidad y dirección del viento">
             
                <NumberData Number="3.8" Value="Km/hr" />

                <div className="mt-auto space-y-3">
                  <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="text-gray-400" size={20} />
                      <div>
                        <div className="text-xs font-bold text-gray-400 text-left">Máximo</div>
                        <div className="font-semibold text-sm text-[#10312B]">14 Km/hr proveniente del NNO</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} /> 16:15 pm
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowDownRight className="text-gray-400" size={20} />
                      <div>
                        <div className="text-xs font-bold text-gray-400">Mínimo</div>
                        <div className="font-semibold text-sm text-[#10312B]">0 Km/hr</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} /> 05:45 am
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowDownRight className="text-gray-400" size={20} />
                      <div>
                        <div className="text-xs font-bold text-gray-400 text-left">Media</div>
                        <div className="font-semibold text-sm text-[#10312B]">3.6 Km/hr proveniente del SO</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      {/* No hay hora específica para la media */}
                    </div>
                  </div>
                  

             </div>
            </MetricCard>
          </div>

        </div>
        
      </div>

      {/* Modal de selección de estación */}
      <StationSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStationSelect={handleStationSelect}
      />
    </div>
  );
};

export default App;