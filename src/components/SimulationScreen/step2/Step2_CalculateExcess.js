import React, { useState, useEffect } from 'react';

    import irData from '../../../ir.json'; 

    function Step2_CalculateExcess({ salary, salaryRange, onPrevious, onNext }) {
        const desde = parseFloat(salaryRange.desde.replace(',', ''));
        const exceso = salary - desde;
        const impuestoExceso = (parseFloat(salaryRange.porcentaje) / 100) * exceso;

        const [transitionClass, setTransitionClass] = useState('fade-enter');

        useEffect(() => {
          setTransitionClass('fade-enter-active');
    
          return () => {
            setTransitionClass('fade-enter');
          };
        }, []);

        return (
          <div className={`step-container rounded shadow p-5 ${transitionClass}`}>
            <h2 className="step-title">Paso 2: Calcula el Impuesto sobre el Exceso</h2>
            <hr className="divider" /> 
            <p>En este paso, calcularemos el impuesto sobre el exceso de tu salario anual.</p>
            <p>Para calcular el impuesto sobre el exceso, primero identificamos el exceso de tu salario anual, que es {salary.toFixed(2)} Córdobas - {desde.toFixed(2)} Córdobas (el límite inferior de tu rango de salario) = {exceso.toFixed(2)} Córdobas.</p>
            <p>Luego, calculamos el impuesto sobre este exceso aplicando el porcentaje correspondiente a tu rango, que es {parseFloat(salaryRange.porcentaje).toFixed(2)}%. Esto nos da un impuesto sobre el exceso de {impuestoExceso.toFixed(2)} Córdobas.</p>
            <p className='text-primary'>Exceso sobre el límite inferior del rango: {exceso.toFixed(2)} Córdobas</p>
            <p className='text-primary'>Impuesto sobre el exceso: {impuestoExceso.toFixed(2)} Córdobas</p>
            
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
              <button className="btn btn-primary" onClick={onNext}>Continuar</button>
            </div>
          </div>
        );
      }
      
      export default Step2_CalculateExcess;
      