import React, { useState, useEffect } from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ onSalarySubmit }) {
  const [salary, setSalary] = useState('');
  const [error, setError] = useState('');
  const [transitionClass, setTransitionClass] = useState('fade-enter');

  useEffect(() => {
    setTransitionClass('fade-enter-active');

    return () => {
      setTransitionClass('fade-enter');
    };
  }, []);

  const handleSubmit = () => {
    if (salary === '') {
      setError('El campo salario no puede estar vacío');
      return;
    }

    const salaryNumber = Number(salary);
    if (salaryNumber < 0.1) {
      setError('El salario debe ser al menos 0.1 Córdobas');
      return;
    }

    setError('');
    onSalarySubmit(salaryNumber);
  };
  
  return (
    <div className={`welcome-container container-fluid d-flex align-items-center justify-content-center vh-100 ${transitionClass}`}>
      <div className="welcome-content text-center bg-white p-5 rounded shadow">
        <h1 className="welcome-title display-4 text-primary">Bienvenido a la Calculadora de IR</h1>
        <p className="welcome-text lead text-secondary">Vamos a guiarte paso a paso para calcular tu Impuesto sobre la Renta de una manera sencilla y visual.</p>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">C$</span>
          <input 
            type="number" 
            value={salary} 
            onChange={(e) => setSalary(e.target.value)} 
            placeholder="Ingresa tu salario mensual" 
            className="form-control"
            aria-label="Salario"
            aria-describedby="basic-addon1"
            min="0.1"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button onClick={handleSubmit} className="btn btn-primary btn-lg">Continuar</button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
