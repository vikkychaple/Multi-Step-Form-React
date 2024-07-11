



import React, { useState ,useEffect} from 'react';

import { simulateApiCall } from '../api';
import '../styles/Step.css';


const Step1 = ({ formData, handleChange, handleNext }) => {
 
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
    if (!formData.name) tempErrors.name = 'Name is required';
    else if (formData.name.length < 4) {
      tempErrors.name = 'Name must be at least 4 characters long';
    } else if (!/^[a-zA-Z]+$/.test(formData.name)) {
      tempErrors.name = 'Name must contain only letters';
    }
    if (!formData.email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
    if (!formData.phone) {
      tempErrors.phone = 'Phone is required';
    } else if (!/^\d+$/.test(formData.phone)) {
      tempErrors.phone = 'Phone number must be numeric';
    } else if (formData.phone.length !== 10) {
      tempErrors.phone = 'Phone number must be 10 digits';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNextStep = async() => {
    if (validate()) {
      


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
    <div >
      <h2  style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Personal Information</h2>
      <form>
        <div className={`form-group ${formVisible ? 'show' : ''}`}>
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={handleChange('name')}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        <div className={`form-group ${formVisible ? 'show' : ''}`}>
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange('email')}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className={`form-group ${formVisible ? 'show' : ''}`}>
          <label>Phone:</label>
          <input
            type="text"
            className="form-control"
            value={formData.phone}
            onChange={handleChange('phone')}
          />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>
        <button type="button" className="btn btn-primary" onClick={handleNextStep} disabled={loading}>
          {loading ? 'Submitting...' : 'Next'}
        </button>
        {apiError && <div className="text-danger mt-2">{apiError}</div>}
      </form>
    </div>
  );
};

export default Step1;
