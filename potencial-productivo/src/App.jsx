import React, { useState, useRef } from 'react';
import styles from './App.module.css';
import CultivoSelector from './components/CultivoSelector';
import DetailsIconLeft from './components/DetailsIconLeft';
import MetricCard from './components/MetricCard';
import NumberData from './components/NumberData';
import CuidadoCultivo from './components/CuidadoCultivo';

import {
  MapPin, Clock, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const App = () => {
  const [selectedStation, setSelectedStation] = useState({
    id: 1, name: 'Ajo', fullName: 'Allium sativum, L.'
  });

  const cultivoSelectorRef = useRef(null);

  const handleStationSelect = (station) => {
    setSelectedStation(station);
  };

  const scrollToCultivoSelector = () => {
    cultivoSelectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>


        {/* ── Selector de cultivo ── */}
        <div ref={cultivoSelectorRef}>
          <CultivoSelector onStationSelect={handleStationSelect} />
        </div>

      </div>
    </div>
  );
};

export default App;
