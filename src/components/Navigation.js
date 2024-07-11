import React from 'react';

const Navigation = ({ currentStep, handleNext, handleBack }) => {
  return (
    <div>
      {currentStep !== 1 && <button onClick={handleBack}>Back</button>}
      {currentStep < 3 ? (
        <button onClick={handleNext}>Next</button>
      ) : (
        <button type="submit">Submit</button>
      )}
    </div>
  );
};

export default Navigation;
