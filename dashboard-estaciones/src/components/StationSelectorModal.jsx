import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { X, MapPin, Search } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Datos mock de estaciones basado en el sitio web
const mockStations = [
  { id: 1, name: 'Marianita', location: 'Mazapil', lat: 24.11, lng: -102.09, active: true },
  { id: 2, name: 'Estación 2', location: 'Fresnillo', lat: 23.18, lng: -102.87, active: true },
  { id: 3, name: 'Estación 3', location: 'Jerez', lat: 22.65, lng: -102.99, active: false },
  { id: 4, name: 'Estación 4', location: 'Sombrerete', lat: 23.63, lng: -103.64, active: true },
  { id: 5, name: 'Estación 5', location: 'Rio Grande', lat: 23.83, lng: -103.03, active: true },
];

const StationSelectorModal = ({ isOpen, onClose, onStationSelect }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStations, setFilteredStations] = useState(mockStations);

  useEffect(() => {
    const filtered = mockStations.filter(station =>
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStations(filtered);
  }, [searchTerm]);

  const handleStationSelect = (station) => {
    setSelectedStation(station);
  };

  const handleConfirmSelection = () => {
    if (selectedStation) {
      onStationSelect(selectedStation);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-[#10312B]">Seleccionar Estación</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-80px)]">
          {/* Panel izquierdo - Lista de estaciones */}
          <div className="lg:w-1/3 p-6 border-r border-gray-200">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar estación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9F2241] focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredStations.map((station) => (
                <div
                  key={station.id}
                  onClick={() => handleStationSelect(station)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedStation?.id === station.id
                      ? 'border-[#9F2241] bg-[#9F2241]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[#10312B]">{station.name}</h3>
                      <p className="text-sm text-gray-600">{station.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        station.active ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={handleConfirmSelection}
                disabled={!selectedStation}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
                  selectedStation
                    ? 'bg-[#9F2241] hover:bg-[#691C32] text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Seleccionar Estación
              </button>
            </div>
          </div>

          {/* Panel derecho - Mapa */}
          <div className="lg:w-2/3 h-96 lg:h-full">
            <MapContainer
              center={[23.5, -102.5]} // Centro de Zacatecas
              zoom={7}
              style={{ height: '100%', width: '100%' }}
              className="rounded-br-2xl"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredStations.map((station) => (
                <Marker
                  key={station.id}
                  position={[station.lat, station.lng]}
                  eventHandlers={{
                    click: () => handleStationSelect(station),
                  }}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-semibold">{station.name}</h3>
                      <p className="text-sm text-gray-600">{station.location}</p>
                      <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs ${
                        station.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          station.active ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        {station.active ? 'Activa' : 'Inactiva'}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationSelectorModal;