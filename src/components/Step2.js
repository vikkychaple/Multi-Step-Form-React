



import React, { useState,useEffect } from 'react';

import { simulateApiCall } from '../api';
import '../styles/Step.css';
const Step2 = ({ formData, handleChange, handleNext, handleBack }) => {
  const [errors, setErrors] = useState({});
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFormVisible(true);
    }, 200); 
    return () => clearTimeout(timeout);
  }, []);


  const validate = () => {
    let tempErrors = {};
    if (!formData.address1) tempErrors.address1 = 'Address Line 1 is required';
    else if (formData.address1.length < 4) {
      tempErrors.address1 = 'Address must be at least 4 characters long';
    } 
    if (!formData.address2) tempErrors.address2 = 'Address Line 2 is required';
    else if (formData.address2.length < 4) {
      tempErrors.address2 = 'Address must be at least 4 characters long';
    } 
    if (!formData.city) tempErrors.city = 'City is required';
    else if (formData.city.length < 3) {
      tempErrors.city = 'City must be at least 3 characters long';
    } 
    else if (!/^[a-zA-Z]+$/.test(formData.city)) {
      tempErrors.city = 'City must contain only letters';
    }
    if (!formData.state) tempErrors.state = 'State is required';
    else if (formData.state.length < 3) {
      tempErrors.state = 'State must be at least 3 characters long';
    } 
    if (!formData.zip) tempErrors.zip = 'Zip Code is required';
    else if (!/^\d+$/.test(formData.zip)) {
      tempErrors.zip = 'Zip Code must be numeric';
    } else if (formData.zip.length !== 6) {
      tempErrors.zip = 'Zip Code must be 6 digits';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNextStep =async () => {
    if (validate()) {
      // handleNext();
      setLoading(true);
      setApiError(null);

      try {
        const response = await simulateApiCall(formData);
        console.log(response);
        handleNext();
      } catch (error) {
        setApiError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Address Information</h2>
      <form>
        <div className={`form-group ${formVisible ? 'show' : ''}`}>
          <label>Address Line 1:</label>
          <input
            type="text"
            className="form-control"
            value={formData.address1}
            onChange={handleChange('address1')}
          />
          {errors.address1 && <div className="text-danger">{errors.address1}</div>}
        </div>
        <div className={`form-group ${formVisible ? 'show' : ''}`}>
          <label>Address Line 2:</label>
          <input
            type="text"
            className="form-control"
            value={formData.address2}
            onChange={handleChange('address2')}
          />
          {errors.address2 && <div className="text-danger">{errors.address2}</div>}
        </div>
        <div className={`form-group ${formVisible ? 'show' : ''}`}>
          <label>City:</label>
          <input
            type="text"
            className="form-control"
            value={formData.city}
            onChange={handleChange('city')}
          />
          {errors.city && <div className="text-danger">{errors.city}</div>}
        </div>
        <div className={`form-group ${formVisible ? 'show' : ''}`}>
          <label>State:</label>
          <input
            type="text"
            className="form-control"
            value={formData.state}
            onChange={handleChange('state')}
          />
          {errors.state && <div className="text-danger">{errors.state}</div>}
        </div>
        <div className={`form-group ${formVisible ? 'show' : ''}`}>
          <label>Zip Code:</label>
          <input
            type="text"
            className="form-control"
            value={formData.zip}
            onChange={handleChange('zip')}
          />
          {errors.zip && <div className="text-danger">{errors.zip}</div>}
        </div>
       
        <button type="button" className="btn btn-secondary" onClick={handleBack} disabled={loading}>Back</button>
        <button type="button" className="btn btn-primary" onClick={handleNextStep} disabled={loading}>
          {loading ? 'Submitting...' : 'Next'}
        </button>
        {apiError && <div className="text-danger mt-2">{apiError}</div>}
      </form>
    </div>
  );
};

export default Step2;
