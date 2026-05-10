import React from 'react';

// Estilo del degradado verde
  const gradientStyle = {
    background: 'linear-gradient(to bottom, #009C00 0%, #006600 100%)'
  };

  const gradientStyleButton = {
    background: 'linear-gradient(to bottom, #5fb262 0%, #009C00 100%)',
    borderRadius: '5px',
    borderBottom: '1px solid #5fb262',
    paddingTop: '10px',
  };

const Footer = () => {
  return (
    <footer className="text-white pt-10 pb-6 mt-auto" style={gradientStyle} >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Columna 1: INIFAP */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-green-400 pb-2 mb-4 uppercase tracking-wider border-radius-2" style={gradientStyleButton} >INIFAP</h3>
            <p className="text-sm leading-relaxed text-gray-100">
              Institución de excelencia científica y tecnológica por su capacidad de respuesta a las demandas de conocimiento y tecnología en beneficio del sector forestal, agrícola y pecuario.
            </p>
          </div>

          {/* Columna 2: INIFAP Zacatecas */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-green-400 pb-2 mb-4 uppercase tracking-wider" style={gradientStyleButton}>INIFAP Zacatecas</h3>
            <p className="text-sm leading-relaxed text-gray-100">
              Genera, valida y apoya la transferencia de tecnologías acorde a las necesidades de productores agropecuarios y forestales del Estado contribuyendo a mejorar sus condiciones de vida y a conservar los recursos naturales.
            </p>
          </div>

          {/* Columna 3: Intranet */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-green-400 pb-2 mb-4 uppercase tracking-wider" style={gradientStyleButton}>Intranet</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <a href="#" className="underline hover:text-green-200">INIFAP México</a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-green-400 pb-2 mb-4 uppercase tracking-wider" style={gradientStyleButton}>Contacto</h3>
            <div className="text-sm space-y-2 text-gray-100">
              <p><span className="font-semibold text-white">Tel:</span> 55-38-71-87-00</p>
              <p><span className="font-semibold text-white">Extensiones:</span></p>
              <p>Teléfono de Atención: <span className="font-medium text-white">82328</span></p>
              <p>Recepción Zacatecas: <span className="font-medium text-white">82337</span></p>
              <div className="pt-2">
                <p className="font-semibold text-white">Correo electrónico:</p>
                <a href="mailto:inifap.zacatecas@inifap.gob.mx" className="block hover:text-green-200">inifap.zacatecas@inifap.gob.mx</a>
                <a href="mailto:arechiga.delia@inifap.gob.mx" className="block hover:text-green-200">arechiga.delia@inifap.gob.mx</a>
              </div>
            </div>
          </div>

        </div>
        
        {/* Créditos finales */}
        <div className="border-t border-green-700 pt-6 text-center text-xs text-green-100">
          <p>&copy; {new Date().getFullYear()} INIFAP C.E. Zacatecas - Estaciones Agroclimáticas</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;