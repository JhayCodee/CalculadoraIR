import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import SimulationScreen from './components/SimulationScreen/SimulationScreen';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  const [salary, setSalary] = useState(null);

  const handleSalarySubmit = (salaryInput) => {
    setSalary(salaryInput);
  };

  const handleRestart = () => {
    setSalary(null);
  };

  return (
    <div className="App">
      {salary === null ? (
        <WelcomeScreen onSalarySubmit={handleSalarySubmit} />
      ) : (
        <SimulationScreen salary={salary} onRestart={handleRestart} />
      )}

      <Footer /> {/* Incluye el componente Footer aquí */}

    </div>
  );
}

export default App;
