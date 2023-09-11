import React, { useState, useEffect } from 'react';
import irData from '../../../ir.json'; 

function Step4_Summary({ salary, salaryRange, onPrevious, onRestart }) {
  const impuestoBase = parseFloat(salaryRange.base.replace(',', ''));
  const desde = parseFloat(salaryRange.desde.replace(',', ''));
  const exceso = salary - desde;
  const impuestoExceso = (parseFloat(salaryRange.porcentaje) / 100) * exceso;
  const totalTax = impuestoBase + impuestoExceso;


  const [transitionClass, setTransitionClass] = useState('fade-enter');

  useEffect(() => {
    setTransitionClass('fade-enter-active');

    return () => {
      setTransitionClass('fade-enter');
    };
  }, []);


  return (
    <div className={`step-container rounded shadow p-5 ${transitionClass}`}>
      <h2 className="step-title">Paso 4: Resumen</h2>
      <hr className="divider" /> 
      <p>¡Hemos llegado al final de la simulación! Aquí está el resumen de tu cálculo de Impuesto sobre la Renta:</p>
      <p>Salario Anual: {salary.toFixed(2)} Córdobas</p>
      <p>Rango de Salario: {salaryRange.desde} - {salaryRange.hasta} Córdobas</p>
      <p>Impuesto Base: {impuestoBase.toFixed(2)} Córdobas</p>
      <p>Impuesto sobre el Exceso: {impuestoExceso.toFixed(2)} Córdobas</p>
      <p className='text-primary'>Impuesto Total: {totalTax.toFixed(2)} Córdobas (Anual), {(totalTax/12).toFixed(2)} Córdobas (Mensual)</p>
      
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

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={onPrevious}>Retroceder</button>
        <button className="btn btn-primary" onClick={onRestart}>Reiniciar</button>
      </div>
    </div>
  );
}

export default Step4_Summary;
