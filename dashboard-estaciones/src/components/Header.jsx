import React, { useState } from 'react';
import { Menu, X, Home } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Estaciones', href: '#' },
    { name: 'Tiempo Real', href: '#' },
    { name: 'Histórico', href: '#' },
    { name: 'Aplicaciones', href: '#' },
    { name: 'Boletines', href: '#' },
    { name: 'Pronóstico', href: '#' },
  ];

  // Estilo del degradado verde
  const gradientStyle = {
    background: 'linear-gradient(to bottom, #009C00 0%, #006600 100%)'
  };

  return (
    <header className="w-full font-sans">
      {/* Barra de navegación superior (Verde INIFAP) */}
      {/*Aqui inicia la sección verde*/}
      <nav 
        style={gradientStyle} 
        className="text-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            {/* Escritorio */}
            <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
              <a href="#" className="hover:text-white/70 transition-colors"><Home size={18} /></a>
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-white/70 transition-colors">
                  {link.name}
                </a>
              ))}
            </div>

            {/* Botón Móvil */}
            <div className="md:hidden flex items-center w-full justify-between">
              <Home size={18} />
              <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Móvil */}
        {isOpen && (
          <div className="md:hidden bg-[#1b5e20] px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="block px-3 py-2 rounded-md text-base hover:bg-[#2e7d32]">
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Banner Principal (Blanco) */}
      <div className="bg-[#F1F1F1] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0" style={{ width: '90px' }}>
            <img 
              src="https://zacatecas.inifap.gob.mx/images/logo.png" 
              alt="Logo INIFAP" 
              className="h-12 object-contain"
            />
          </div>
          <h3 className="text-[#1b5e20] text-xl md:text-2xl font-semibold text-center md:text-right">
            Red de Monitoreo Agroclimático del Estado de Zacatecas
          </h3>
        </div>
      </div>
    </header>
  );
};

export default Header;