



import React , {useState}from 'react';

import { simulateApiCall } from '../api';

const Step3 = ({ formData, handleBack, handleSubmit }) => {

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleSubmitForm = async () => {
    setLoading(true);
    setApiError(null);

    try {
      const response = await simulateApiCall(formData);
      console.log(response);
      handleSubmit();
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Review</h2>
      <div>
        <h3>Personal Information</h3>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Phone: {formData.phone}</p>
      </div>
      <div>
        <h3>Address Information</h3>
        <p>Address Line 1: {formData.address1}</p>
        <p>Address Line 2: {formData.address2}</p>
        <p>City: {formData.city}</p>
        <p>State: {formData.state}</p>
        <p>Zip Code: {formData.zip}</p>
      </div>
     
      <button type="button" className="btn btn-secondary" onClick={handleBack} disabled={loading}>
        Back
      </button>
      <button
        type="button"
        className="btn btn-success"
        onClick={handleSubmitForm}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {apiError && <div className="text-danger mt-2">{apiError}</div>}
    </div>
  );
};

export default Step3;

