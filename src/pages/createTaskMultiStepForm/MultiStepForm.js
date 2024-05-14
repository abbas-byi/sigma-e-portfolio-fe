import React, { useState } from 'react';
import Steps from './steps';
const [Step1, Step2, Step3, Step4] = Steps

const MainForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const finishForm = () => {
    console.log(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <form>
        {renderStep()}
        <div className="mt-3">
          {currentStep > 1 && (
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={prevStep}
            >
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={nextStep}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={finishForm}
            >
              Finish
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MainForm;
