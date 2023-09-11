import React, { useState, useEffect } from 'react';
import './SimulationScreen.css';
import Step1_IdentifyRange from './step1/Step1_IdentifyRange';
import Step2_CalculateExcess from './step2/Step2_CalculateExcess';
import Step3_CalculateTotalTax from './step3/Step3_CalculateTotalIR';
import Step4_Summary from './step4/Step4_Summary';

function SimulationScreen({ salary, onRestart }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [salaryRange, setSalaryRange] = useState(null);
  const [transitionClass, setTransitionClass] = useState('fade-enter');

  useEffect(() => {
    setTransitionClass('fade-enter-active');

    return () => {
      setTransitionClass('fade-enter');
    };
  }, [currentStep]);

  const INSS_DEDUCTION_RATE = 0.07;
  const monthlyINSSDeduction = salary * INSS_DEDUCTION_RATE;
  const netMonthlySalary = salary - monthlyINSSDeduction;
  const annualSalary = netMonthlySalary * 12;


  return (
    <div  className={`simulation-container container-fluid ${transitionClass}`} >
    <div className="header-section rounded">
      <h1 className="simulation-title">Simulación de Cálculo de IR</h1>

      {
        currentStep === 1 && (
          <div className="salary-details d-flex justify-content-between flex-wrap">
          <p className="simulation-salary">Salario mensual bruto: {salary.toFixed(2)} Córdobas</p>
          <p className="simulation-salary">Deducción del INSS mensual: {monthlyINSSDeduction.toFixed(2)} Córdobas</p>
          <p className="simulation-salary">Salario mensual neto: {netMonthlySalary.toFixed(2)} Córdobas</p>
          <p className="simulation-salary text-primary fn">Salario anual neto: {annualSalary.toFixed(2)} Córdobas</p>
          </div>
        )
      }
     
    </div>

      
      {currentStep === 1 && <Step1_IdentifyRange salary={annualSalary} onNext={(newSalaryRange) => { setSalaryRange(newSalaryRange); setCurrentStep(2); }} />}
      {currentStep === 2 && <Step2_CalculateExcess salary={annualSalary} salaryRange={salaryRange} onPrevious={() => setCurrentStep(1)} onNext={() => setCurrentStep(3)} />}
      {currentStep === 3 && <Step3_CalculateTotalTax salary={annualSalary} salaryRange={salaryRange} onPrevious={() => setCurrentStep(2)} onNext={() => setCurrentStep(4)} />}
      {currentStep === 4 && <Step4_Summary salary={annualSalary} salaryRange={salaryRange} onPrevious={() => setCurrentStep(3)} onRestart={onRestart} />}  
    </div>
  );
}

export default SimulationScreen;
