
import React, { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import SubmitModal from './SubmitModal';
import '../styles/form.css';

const Form = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAnotherResponse = () => {
    setShowModal(false);
    setCurrentStep(1); 
    setFormData({
      name: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    });
  };

  return (
    <div className="container form-container ">
      <div className="form-content">
        {currentStep === 1 && <Step1 formData={formData} handleChange={handleChange} handleNext={handleNext} />}
        {currentStep === 2 && <Step2 formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />}
        {currentStep === 3 && <Step3 formData={formData} handleBack={handleBack} handleSubmit={handleSubmit} />}
      </div>
      <SubmitModal show={showModal} handleClose={handleCloseModal} handleAnotherResponse={handleAnotherResponse} />
    </div>
  );
};

export default Form;



















