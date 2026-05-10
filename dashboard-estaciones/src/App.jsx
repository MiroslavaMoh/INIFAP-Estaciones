import './App.css'
import React, { useState, useMemo } from 'react';
import Header from './components/Header'; 
import Footer from './components/Footer';
import StationSelectorModal from './components/StationSelectorModal';
import DetailsIconLeft from './components/DetailsIconLeft';
import Grafica from './components/Grafica';

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
  BarChart2
} from 'lucide-react';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState({
    id: 1,
    name: 'Marianita',
    location: 'Mazapil'
  });

  // Colores institucionales GOB.mx
  const gobColors = {
    guinda: '#9F2241',
    verdeOscuro: '#10312B',
    verdeClaro: '#285C4D',
    dorado: '#D4C19C',
    crema: '#B38E5D',
    gris: '#F4F6F8'
  };

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    console.log('Estación seleccionada:', station);
  };

  return (
    
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-gray-800">
      <Header /> 
      
      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">

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
                  <span className="text-2xl sm:text-3xl text-gray-600 font-medium">{selectedStation.location}</span>
                  
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Componente: Detalle-maximo-minimo */}
          {/* Temperatura */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-2 bg-[#9F2241] rounded-r-md"></div>
            <div className="pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-500 font-semibold text-lg text-left">Temperatura</h3>
                <Thermometer className="text-[#9F2241]" size={32} />
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#10312B]">24.5</span>
                <span className="text-xl font-medium text-gray-500">°C</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-400 mb-1 text-left">Máximo</div>
                  <div className="font-semibold text-sm text-left">36.4°C</div>
                  <div className="text-xs text-gray-400 text-left">16:15 pm</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-400 mb-1 text-left"> Mínimo</div>
                  <div className="font-semibold text-sm text-left">36.4°C</div>
                  <div className="text-xs text-gray-400 text-left">16:15 pm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Componente: Detalle-maximo-minimo */}
          {/* Humedad */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-2 bg-[#285C4D] rounded-r-md"></div>
            <div className="pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-500 font-semibold text-lg text-left">Humedad relativa</h3>
                <Droplets className="text-[#285C4D]" size={32} />
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#10312B]">17.2</span>
                <span className="text-xl font-medium text-gray-500">%</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-400 mb-1 text-left"> Máximo</div>
                  <div className="font-semibold text-sm text-left">36.4°C</div>
                  <div className="text-xs text-gray-400 text-left">16:15 pm</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-400 mb-1 text-left"> Mínimo</div>
                  <div className="font-semibold text-sm text-left">36.4°C</div>
                  <div className="text-xs text-gray-400 text-left">16:15 pm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Componente: Detalle-total */}
          {/* Precipitación */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-2 bg-[#10312B] rounded-r-md"></div>
            <div className="pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-500 font-semibold text-lg">Precipitación</h3>
                <CloudRain className="text-[#10312B]" size={32} />
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#10312B]">0.0</span>
                <span className="text-xl font-medium text-gray-500">mm</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-center gap-3">
                <ArrowUpRight className="text-gray-400" size={20} />
                <div>
                  <div className="text-xs font-bold text-gray-400 text-left">Total acumulada</div>
                  <div className="font-semibold text-md text-left">0.0mm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Componente: Detalle-total */}
          {/* Radiación */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-2 bg-[#D4C19C] rounded-r-md"></div>
            <div className="pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-500 font-semibold text-lg">Radiación</h3>
                <Sun className="text-[#D4C19C]" size={32} />
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#10312B]">0.0</span>
                <span className="text-xl font-medium text-gray-500">W/m²</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-center gap-3">
                <ArrowUpRight className="text-gray-400" size={20} />
                <div>
                  <div className="text-xs font-bold text-gray-400 text-left">Total registrada</div>
                  <div className="font-semibold text-md text-left">27,710 W/m²</div>
                </div>
              </div>
              
            </div>
          </div>

        </div>

        {/* Fila 2: Estado y Gráfica */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Componente: Detalles-mensaje*/}
          {/* Alerta */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            
            <div className="p-6 relative">
              <div className="absolute left-0 top-6 bottom-6 w-2 bg-[#9F2241] rounded-r-md"></div>
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#10312B]">Estado* (por ver)</h3>
                  <AlertTriangle className="text-gray-400" size={28} />
              </div>
              
              <div className="space-y-4 pl-4">
                <div className="bg-[#285C4D]/10 border border-[#285C4D]/20 rounded-xl p-4 flex gap-3">
                  <CheckCircle2 className="text-[#285C4D] shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-xs font-bold text-[#285C4D] uppercase tracking-wider mb-1 text-left">Condiciones</p>
                    <p className="text-sm text-[#10312B] font-medium leading-relaxed text-left">Ventana favorable baja deriva y temperatura estable.</p>
                  </div>
                </div>

                <div className="bg-[#D4C19C]/20 border border-[#D4C19C]/40 rounded-xl p-4 flex gap-3">
                  <AlertTriangle className="text-[#B38E5D] shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-xs font-bold text-[#B38E5D] uppercase tracking-wider mb-1 text-left">Alerta</p>
                    <p className="text-sm text-[#10312B] font-medium leading-relaxed text-left">Ráfagas de viento de 22.8 km/h registradas a las 01:30 PM.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Componente: Grafica*/}
          {/* Card Gráfica Interactiva */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="absolute left-0 top-6 bottom-6 w-2 bg-[#9F2241] rounded-r-md"></div>
            <div className="p-6 pl-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#10312B] text-left">Histórico de 24 Horas</h3>
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
            </div>
          </div>
        </div>

        {/* Fila 3: Ubicación y Viento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Componente: Detalles-mensaje (variables: icono, titulo, contenido)*/}
          {/* Ubicación */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
             <div className="absolute left-0 top-6 bottom-6 w-2 bg-[#9F2241] rounded-r-md"></div>
             <div className="pl-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#10312B]">Ubicación</h3>
                  <MapPin className="text-gray-400" size={28} />
                </div>
                
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
             </div>
          </div>

          {/* Componente: Detalles-maximo-minimo-media */}
          {/* Viento */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
             <div className="absolute left-0 top-6 bottom-6 w-2 bg-gray-300 rounded-r-md"></div>
             <div className="pl-4 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-gray-500 font-semibold text-lg mb-1">Velocidad y dirección del viento</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-[#10312B]">3.8</span>
                      <span className="text-xl font-medium text-gray-500">Km/hr</span>
                    </div>
                  </div>
                  <Wind className="text-gray-400" size={48} strokeWidth={1.5} />
                </div>

                <div className="mt-auto space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
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

                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
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

                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
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

             </div>
          </div>

        </div>
      </div>

      {/* Modal de selección de estación */}
      <StationSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStationSelect={handleStationSelect}
      />
      <Footer /> 
    </div>
  );
};

export default App;