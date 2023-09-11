import React, { useState, useEffect } from 'react';
import './Step1_IdentifyRange.css';
import irData from '../../../ir.json'; 
import '../SimulationScreen.css';

function Step1_IdentifyRange({ salary, onNext }) {

    const findSalaryRange = () => {
        return irData.IR2023.find(range => {
          const desde = parseFloat(range.desde.replace(',', ''));
          const hasta = range.hasta === "más" ? Infinity : parseFloat(range.hasta.replace(',', ''));
          return salary >= desde && salary <= hasta; 
        });
    };

  const salaryRange = findSalaryRange();

  const [transitionClass, setTransitionClass] = useState('fade-enter');

  useEffect(() => {
    setTransitionClass('fade-enter-active');

    return () => {
      setTransitionClass('fade-enter');
    };
  }, []);

  return (
    <div className={`step-container rounded shadow p-5 ${transitionClass}`}>
      <h2 className="step-title">Paso 1: Identifica en qué rango se encuentra tu salario</h2>
      <hr className="divider" /> 
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Desde</th>
              <th>Hasta</th>
              <th>Impuesto Base</th>
              <th>Porcentaje Aplicable</th>
              <th>Sobre Exceso</th>
            </tr>
          </thead>
          <tbody>
            {irData.IR2023.map((range, index) => (
              <tr key={index} className={range === salaryRange ? 'table-primary' : ''}>
                <td>{range.desde}</td>
                <td>{range.hasta}</td>
                <td>{range.base}</td>
                <td>{range.porcentaje}</td>
                <td>{range.exceso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-end">
       <button className="btn btn-primary" onClick={() => onNext(salaryRange)}>Continuar</button>
      </div>

    </div>
  );
}

export default Step1_IdentifyRange;
